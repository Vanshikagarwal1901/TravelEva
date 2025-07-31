from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

@api_view(['POST'])
def translate_text(request):
    text = request.data.get('text')
    target_lang = request.data.get('target_language')

    GOOGLE_API_KEY = 'YOUR_API_KEY'
    url = 'https://translation.googleapis.com/language/translate/v2'
    params = {
        'q': text,
        'target': target_lang,
        'key': GOOGLE_API_KEY
    }

    res = requests.post(url, params=params)
    data = res.json()
    translated_text = data['data']['translations'][0]['translatedText']
    return Response({'translated_text': translated_text})
