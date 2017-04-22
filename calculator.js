function Calculator(inputString) {
  this.tokenStream = this.lexer(inputString);
  this.stack = [];
}

Calculator.prototype.lexer = function(inputString) {
    var tokenTypes = [
    ["NUMBER",    /^\d+/ ],
    ["ADD",       /^\+/  ],
    ["SUB",       /^\-/  ],
    ["MUL",       /^\*/  ],
    ["DIV",       /^\//  ],
    ["LPAREN",    /^\(/  ],
    ["RPAREN",    /^\)/  ]
  ];
  var stream = [];
  var newS = inputString;
  var token;

  while (newS.length) {
    tokenTypes.forEach(function(ex) {
      var match = newS.match(ex[1]);
      if (match) {
        token = {
          name: ex[0],
          value: match[0]
        };
        stream.push(token);
        newS = newS.slice(match[0].length);
        token = {};
      } else {
      }
    });
  }
  return stream;
};

Calculator.prototype.peek = function() {
  return this.tokenStream[0] || null;
};

Calculator.prototype.get = function() {
  return this.tokenStream.shift();
};
// var calc = new Calculator('12+5');

Calculator.prototype.TreeNode = function(name) {
  this.name = name;
  this.childs = [].slice.call(arguments, 1);
};

Calculator.prototype.parseFactor = function() {
    var next = this.peek();
    if (next.name === 'NUMBER') {
      return new this.TreeNode(next.value);
      //maybe do something else
    } else {
      return this.parseExpression();
    }
};
Calculator.prototype.parseTerm = function() {
  var f = this.parseFactor();
  var b = this.parseB();
  return new this.TreeNode('Term', f, b);
};
Calculator.prototype.parseA = function() {
  var next = this.peek();
  if(next && next.name === "ADD") {
    this.get();
    var t = parseTerm();
    var a = parseA();
    return new this.TreeNode('A', '+', t, a);
  } else if(next && next.name === "SUB") {
    this.get();
    var t = parseTerm();
    var a = parseA();
    return new this.TreeNode('A', '-', t, a);
  } else {
    return new this.TreeNode('A');
  }
};
Calculator.prototype.parseB = function() {
  var next = this.peek();
  if(next && next.name === "MUL") {
    this.get();
    var f = parseFactor();
    var b = parseB();
    return new this.TreeNode('B', '*', f, b);
  } else if(next && next.name === "DIV") {
    this.get();
    var f = parseFactor();
    var b = parseB();
    return new this.TreeNode('B', '/', f, b);
  } else {
    return new this.TreeNode('B');
  }
};
Calculator.prototype.parseExpression = function () {
  var term = this.parseTerm();
  var a = this.parseA();

  return new this.TreeNode("Expression", term, a);
};

Calculator.prototype.traverse = function(node) {
  var currentNode = calc.parseExpression() || node;
  if (currentNode.childs === []) {
    return currentNode;
  } else {
    currentNode.childs.forEach(this.traverse);
  }

};
var calc = new Calculator('12+5');
console.log(calc.parseExpression());
// console.log('tokenStream ', calc.tokenStream);
// var node = new calc.TreeNode('hello', 4, 5, 6);
// console.log(node);

// this.visit = switch(node.name) {
//   case "Expression":
//     break;
//   case "Term":
//     break;
//   case "MUL":
//     return node.value;
// }

// visitor = {
//   visit: '*',
// };

// visitor = {
//   visit: '12'
// }

// visitor = {
//   visit: '5'
// }


