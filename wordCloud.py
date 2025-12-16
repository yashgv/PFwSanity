import PyPDF2
from wordcloud import WordCloud

import matplotlib.pyplot as plt

def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() or ""
    return text

def generate_wordcloud(text, output_path):
    wc = WordCloud(width=800, height=400, background_color="white", color_func=lambda *args, **kwargs: "#101828")
    wc.generate(text)
    wc.to_file(output_path)
    plt.imshow(wc, interpolation='bilinear')
    plt.axis("off")
    plt.show()

if __name__ == "__main__":
    pdf_path = "public\Yash_Varma_11-08-2025.pdf"  # Replace with your PDF file path
    output_path = "public\wc.png"
    # text = extract_text_from_pdf(pdf_path)
    text = "AI CrewAI Hackathon Langchain Flask Nextjs Reactjs Transformers Financial Vercel Linkedin Github Education ArtificialIntelligence MachineLearning ComputerArchitecture Comparison Algorithms Image Video Processing Cloud Computing Technical Skills Python Javascript Sql Colab Hugging Face Google Console Git Gitlab Github Vscode Express Mysql Postgresql Mongodb Supabase Experience Intern Connectwise RAG Application Jira Pipeline Cartman Labs Twitter Platform VM EaseworkAI Graph FastAPI LLMs Projects LoanSaathi Assistant Eligibility EMI Reminders Finsaathi Accessibility India NLP Guidance Scheme Matching Analysis Adaptive Sentence CosineSimilarity Llama Honours Awards Amd Sprint Iit Bombay Gajshield Bengaluru Datathon Hackanova Cognition SIH Aavishkar Arena Competitive Programming Publications Fake News Bert Ensemble Springer Copyright DimensionCapture ArucoMarker Measurement Lidar Alternative"


    generate_wordcloud(text, output_path)