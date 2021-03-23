import lexer


def main():
    while True:
        text = input('cheems > ')
        result, error = lexer.run('main.cheems', text)

        if error: print(error.as_string())
        else: print(result)

if __name__ == '__main__':
    main()