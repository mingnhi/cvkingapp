# Sử dụng image Python chính thức
FROM python:3.10

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]