import PyPDF2
from dotenv import load_dotenv
import pandas as pd
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import OpenAI
from langchain.callbacks import get_openai_callback
from langchain.chains.question_answering import load_qa_chain
from langchain.agents import create_pandas_dataframe_agent
import pyodbc


from langchain.chat_models import AzureChatOpenAI

db_result = None

load_dotenv()
def pdfs(file, question):
    with open(file, 'rb') as archivo:
        caracteres = ["\n", "-", "_", " "]
        lector = PyPDF2.PdfReader(archivo)
        texto = ""
        for pag in lector.pages:
            texto += pag.extract_text()
        for caracter in caracteres:
            texto = texto.replace(caracter, "")
        texto_div = CharacterTextSplitter(separator=",", chunk_size=2000, chunk_overlap=200, length_function=len)
        chunks = texto_div.split_text(texto)
        embeddings = OpenAIEmbeddings()
        base = FAISS.from_texts(chunks, embeddings)
        docs = base.similarity_search(question)
        llm = OpenAI()
        chain = load_qa_chain(llm, chain_type="stuff")
        with get_openai_callback():
            response = chain.run(input_documents=docs, question=question)
    return response

def xlsx(file, question):

    # key open ai:
    df = pd.read_excel(file)
    print(df)
    agent = create_pandas_dataframe_agent(OpenAI(temperature=0), df, verbose=True)
    response = agent.run(question)
    print(response)
    return response


    # df = pd.read_excel(file)
    # agent = create_pandas_dataframe_agent(
    #     AzureChatOpenAI(openai_api_base="https://alph4num3r1c.openai.azure.com/",
    #     openai_api_version="2023-05-15",
    #     deployment_name="TestGPT35turbo",
    #     openai_api_key="3b15abf78a264c4a8a1c234febfe7cf9",
    #     openai_api_type="azure"),
    #     df,
    #     verbose=True,    
    # )
    # response = agent.run(question)
    

def conect_db(datos_formulario):
    server = datos_formulario['server']
    database = datos_formulario['db']
    driver = '{SQL Server}'
    username = datos_formulario['user']
    password = datos_formulario['password']
    table = datos_formulario['tabla']
    connection_string = f'DRIVER={driver};SERVER=tcp:{server};PORT=1433;DATABASE={database};UID={username};PWD={password}'
    with pyodbc.connect(connection_string) as conn:
        query = '''
            SELECT * FROM [dbo].[{}] 
        '''.format(table)
        global db_result
        db_result = pd.read_sql(sql=query, con=conn)

def db(question):
    global db_result
    print(db_result)
    agent = create_pandas_dataframe_agent(OpenAI(temperature=0), db_result, verbose=True)
    response = agent.run(question)
    return response
        
