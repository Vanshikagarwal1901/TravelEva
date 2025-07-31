from googletrans import Translator, LANGUAGES

def translate_text(text, dest_language='en', src_language='auto'):
    """
    Translate text to a target language
    
    Parameters:
    text (str): Text to translate
    dest_language (str): Language code for target language (default 'en')
    src_language (str): Language code for source language (default 'auto' for auto-detection)
    
    Returns:
    str: Translated text
    """
    translator = Translator()
    translation = translator.translate(text, dest=dest_language, src=src_language)
    return translation.text

def list_languages():
    """Print all available languages and their codes"""
    print("Available languages:")
    for code, name in LANGUAGES.items():
        print(f"{code}: {name}")

def main():
    print("Text Translation Tool")
    print("--------------------")
    
    while True:
        print("\nOptions:")
        print("1. Translate text")
        print("2. List available languages")
        print("3. Exit")
        
        choice = input("Enter your choice (1-3): ")
        
        if choice == '1':
            text = input("Enter text to translate: ")
            src_lang = input("Enter source language code (or 'auto' for detection): ")
            dest_lang = input("Enter target language code (e.g., 'es', 'fr', 'de'): ")
            
            try:
                translated = translate_text(text, dest_lang, src_lang)
                print("\nTranslation Result:")
                print(f"Original: {text}")
                print(f"Translated: {translated}")
            except Exception as e:
                print(f"Error during translation: {e}")
                
        elif choice == '2':
            list_languages()
            
        elif choice == '3':
            print("Exiting translation tool...")
            break
            
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()