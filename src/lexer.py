# DO NOT CHANGE THIS VALUES
DIGITS = '0123456789'
TT_INT = 'INT'
TT_FLOAT = 'FLOAT'
TT_PLUS = 'PLUS'
TT_MINUS = 'MINUS'
TT_MUL = 'MUL'
TT_DIV = 'DIV'
TT_LPAREN = 'LPAREN'
TT_RPAREN = 'RPAREN'


class Error:
    """ This class is meant to handle errors during execution.

    Attributes:
        pos_start: copy of current position
        pos_end: current position during the tokenization process
        error_name: error name
        details: error details
    """

    def __init__(self, pos_start, pos_end, error_name, details):
        self.pos_start = pos_start
        self.pos_end = pos_end
        self.error_name = error_name
        self.details = details

    def as_string(self):
        """ Returns formated error as a string."""
        result = f'{self.error_name}: {self.details}\n'
        result += f'File: {self.pos_start.fn}, at {self.pos_start.ln + 1}:{self.pos_start.col}'
        return result


class IllegalCharacterError(Error):
    """ This class is thrown if an illegal character appears.

    Attributes:
        Inherited from Error class.
    """

    def __init__(self, pos_start, pos_end, details):
        super().__init__(pos_start, pos_end, 'Illegal Character Error', details)


class Position:
    """ This class is the register of the current position of the
    lexer during the tokenization process.

    Attributes:
        idx: current position in the tokenization process
        ln: current line in the tokenization process
        col: current column in the tokenization process
        fn: file name that is being read
        ftxt: file text that is being processed
    """

    def __init__(self, idx, ln, col, fn, ftxt):
        self.idx = idx
        self.ln = ln
        self.col = col
        self.fn = fn
        self.ftxt = ftxt

    def advance(self, current_char):
        """This methods advances to the next character and also increases the code line."""
        self.idx += 1
        self.col += 1

        if current_char == '\n':
            self.ln = 1
            self.col = 0

        return self

    def copy(self):
        """This method return a Position object, a copy of the current position."""
        return Position(self.idx, self.ln, self.col, self.fn, self.ftxt)


class Token:
    """ This class is the structure for the tokens.

    Attributes:
        type: token data type
        value: token value (not all tokens require a value)
    """

    def __init__(self, type_, value=None):
        self.type = type_
        self.value = value

    def __repr__(self):
        """This method returns how a token is represented"""
        if self.value:
            return f'{self.type}:{self.value}'
        return f'{self.type}'


class Lexer:
    """ This class is the structure for the tokens.

    Attributes:
        type: token data type
        value: token value (not all tokens require a value)
    """

    def __init__(self, fn, text):
        self.fn = fn
        self.text = text
        self.pos = Position(-1, 0, -1, fn, text)
        self.current_char = None
        self.advance()

    def advance(self):
        """This method increases the current position"""
        self.pos.advance(self.current_char)
        self.current_char = self.text[self.pos.idx] if self.pos.idx < len(self.text) else None

    def make_tokens(self):
        """This method creates, storages, and returns the generated tokens"""
        tokens = []

        while self.current_char != None:
            if self.current_char in ' \t':
                self.advance()
            elif self.current_char in DIGITS:
                tokens.append(self.make_number())
            elif self.current_char == '+':
                tokens.append(Token(TT_PLUS))
                self.advance()
            elif self.current_char == '-':
                tokens.append(Token(TT_MINUS))
                self.advance()
            elif self.current_char == '*':
                tokens.append(Token(TT_MUL))
                self.advance()
            elif self.current_char == '/':
                tokens.append(Token(TT_DIV))
                self.advance()
            elif self.current_char == '(':
                tokens.append(Token(TT_LPAREN))
                self.advance()
            elif self.current_char == ')':
                tokens.append(Token(TT_RPAREN))
                self.advance()
            else:
                pos_start = self.pos.copy()
                char = self.current_char
                self.advance()
                return [], IllegalCharacterError(pos_start, self.pos, f'"{char}"')

        return tokens, None

    def make_number(self):
        """This method creates a number when necessary and handles its different variations."""
        num_str = ''
        dot_count = 0

        while self.current_char != None and self.current_char in (DIGITS + '.'):
            if self.current_char == '.':
                if dot_count == 1:
                    break
                dot_count += 1
                num_str += '.'
            else:
                num_str += self.current_char

            self.advance()

        if dot_count == 0:
            return Token(TT_INT, int(num_str))
        else:
            return Token(TT_FLOAT, float(num_str))


def run(fn, text):
    """Run the lexer and return the generated tokens and error in case of any."""
    lexer = Lexer(fn, text)
    tokens, error = lexer.make_tokens()

    return tokens, error
