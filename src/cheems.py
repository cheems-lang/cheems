import lexer

while True:
    text = input('cheems > ')
    result, error = lexer.run('main.cheems', text)

    if error: print(error.as_string())
    else: print(result)