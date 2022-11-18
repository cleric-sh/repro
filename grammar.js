/// <reference types="tree-sitter-cli/dsl" />
/// More on typing for grammar.js:
/// https://github.com/tree-sitter/tree-sitter/pull/658

module.exports = grammar({
    name: 'my_grammar',
  
    rules: {                                

        source_file: $ => repeat(
            choice(
                $.service_declaration,
            )
        ),
        
        service_declaration: $=> seq('service', $.service_name),
    
        service_name: $ => /[_a-zA-Z\-][\w_]*/,
    }
  });
