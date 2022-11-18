import Parser from 'web-tree-sitter';

export async function getParser() {
    await Parser.init();
    const parser = new Parser();
    const MyGramamr = await Parser.Language.load("./tree-sitter-my_grammar.wasm");
    parser.setLanguage(MyGramamr);
    return parser;
}
