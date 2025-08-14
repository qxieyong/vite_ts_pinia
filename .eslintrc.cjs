module.exports = {
	root: true, // 表示这是项目根目录的 ESLint 配置，防止 ESLint 继续向上查找配置文件
	env: {
		browser: true, // 支持浏览器全局变量
		es2021: true
	},
	extends: [
		"eslint:recommended", // ESLint 官方推荐的基础规则集合。
		"plugin:@typescript-eslint/recommended", // TypeScript 相关的推荐规则。
		"plugin:vue/vue3-recommended", // Vue 3 官方推荐的规则。
		"plugin:prettier/recommended", // 集成 Prettier 的格式化规则，避免格式冲突。
		"plugin:import/recommended" // 管理 import 导入顺序和规则的推荐配置。
	],
	settings: {
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
				project: "./tsconfig.json" // 确保这个路径是正确的
			}
		}
	},
	parser: "vue-eslint-parser", // Vue 文件的解析器
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		parser: "@typescript-eslint/parser",
		project: ["./tsconfig.json"],
		extraFileExtensions: [".vue"]
	},
	plugins: ["@typescript-eslint", "prettier", "import"],
	ignorePatterns: [
		"src/vendor/**",
		"src/solid/**",
		"src/opus-recorder/**",
		"public/**",
		"dist",
		".eslintrc.cjs",
		"vite.config.ts",
		"src/vite-env.d.ts"
	], // 忽略检查
	overrides: [
		{
			files: ["*.ts"],
			parserOptions: {
				project: ["./tsconfig.json"]
			}
		}
	],
	// 0：关闭，1：警告，2：禁止   或者：off/warn/error
	rules: {
		"max-len": ["error", { code: 150 }], // 将一行代码的最大长度设置为 150 个字符
		"keyword-spacing": [
			// 关键字（如 if、else、for 等）和其后面或前面空格的要求
			"error",
			{
				after: true, // 关键字后必须有空格
				overrides: {
					if: { before: true, after: true }, // if 前后都要空格
					else: { before: true }, // else 前要空格
					catch: { before: true, after: true }, // catch 前后都要空格
					for: { after: true }, // for 后要空格
					while: { after: true }, // while 后要空格
					switch: { after: true } // switch 后要空格
				}
			}
		],
		"linebreak-style": "off", // 关闭对换行符风格的强制检测（避免跨平台换行符错误）
		"eol-last": "off", // 关闭文件末尾必须换行的强制要求
		// 缩进规则，使用 tab 缩进，且对函数参数、调用参数、对象、switch case 等做了详细缩进配置
		indent: [
			"error",
			"tab",
			{
				CallExpression: { arguments: 1 }, // 调用表达式参数缩进一级
				FunctionDeclaration: { body: 1, parameters: 1 }, // 函数声明体和参数缩进一级
				FunctionExpression: { body: 1, parameters: 1 }, // 函数表达式体和参数缩进一级
				MemberExpression: 1, // 成员表达式缩进一级
				ObjectExpression: 1, // 对象表达式缩进一级
				SwitchCase: 1, // switch case 缩进一级
				ignoredNodes: ["ConditionalExpression"] // 条件表达式忽略缩进检查
			}
		],
		"vue/multi-word-component-names": "off", // 关闭 Vue 组件名必须多词的限制（允许单词组件名）
		"no-explicit-any": "off", //关闭禁止使用 any 类型的规则（不限制 any）
		camelcase: ["error", { ignoreDestructuring: true }], // 驼峰命名规则，忽略解构赋值中的命名
		"guard-for-in": "off", // 关闭检查 for-in 循环中是否使用 hasOwnProperty 的规则
		"prefer-promise-reject-errors": ["error", { allowEmptyReject: true }], //强制要求在 Promise 的 reject() 中传入 Error 对象 Promise.reject(new Error("something went wrong"));
		curly: "off", // 禁用了控制语句使用花括号的规则
		"comma-dangle": ["error", "never"], //要求对象字面量或数组字面量中最后一个元素后面不能有逗号。
		"comma-spacing": "error", //要求逗号后面有空格，逗号前面不能有空格。
		"comma-style": "error", //要求逗号放在行末，而不是行首。
		"quote-props": ["error", "consistent"], //要求对象字面量属性名称的引号类型一致。
		quotes: ["error", "double", { allowTemplateLiterals: true }], // 要求字符串使用双引号，允许字符串中使用模板字面量
		"space-before-blocks": ["error", "always"], //要求在代码块开始的地方使用空格。
		"spaced-comment": ["error", "always"], //注释符号后面必须有空格
		"prefer-spread": "off", //  关闭 prefer-spread 规则（不强制用扩展运算符）
		"prefer-const": ["error", { destructuring: "all" }], // 要求使用 const 声明所有不会被重新赋值的变量，包括解构赋值
		"object-curly-spacing": ["error", "always"], //要求对象字面量的大括号内没有空格。
		"array-bracket-spacing": ["error", "never"], //要求数组字面量的方括号内没有空格。
		"switch-colon-spacing": "error", //要求 switch 语句中的冒号前后有空格。
		"operator-linebreak": ["error", "after"], //要求操作符放在换行符后面。
		"padded-blocks": ["error", "never"], //要求代码块内没有不必要的填充空行。
		"new-cap": "error", // 构造函数名必须以大写字母开头
		"no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }], // 禁止未使用的变量，允许以 _ 开头的变量未使用
		"no-useless-call": "error", //禁止不必要的函数调用。
		"no-trailing-spaces": "off", //允许行尾有多余的空格。
		"no-mixed-spaces-and-tabs": "error", //禁止使用空格和制表符混合缩进。
		"no-multiple-empty-lines": ["error", { max: 3 }], //禁止出现多余的空行，最多只允许连续三行空行。
		"no-tabs": "off", // 允许使用制表符缩进（no-tabs 关闭）
		"no-multi-str": "error", //禁止使用多行字符串。
		"no-new-wrappers": "error", //禁止对原始数据类型进行包装实例化。
		"no-irregular-whitespace": ["error", { skipStrings: true, skipComments: true, skipRegExps: true, skipTemplates: true }], //禁止在代码中使用不规则的空白符，但允许在字符串、注释、正则表达式和模板字符串中使用。
		"no-unexpected-multiline": "error", // 禁止意外的多行表达式，如行尾缺少分号引起的问题
		"no-return-await": "error", // 禁止在 return 语句中使用不必要的 `await
		"@typescript-eslint/await-thenable": "error", // TypeScript 相关规则，禁止 await 非 Promise 类型
		"@typescript-eslint/no-misused-promises": ["error", { checksConditionals: true, checksVoidReturn: true, checksSpreads: true }], //TypeScript 规则，防止错误使用 Promise
		complexity: ["error", { max: 15 }], //将圈复杂度的最大值设为15
		"prettier/prettier": "error", // 启用 prettier 的错误级别规则，让 prettier 格式问题以 ESLint 错误显示
		"@typescript-eslint/ban-ts-comment": "off", // 关闭禁止使用 ts-ignore 等 ts 注释的限制
		"space-before-function-paren": [
			"error",
			{
				anonymous: "always", // 匿名函数前必须有空格 function () {}
				named: "never", // 命名函数前不能有空格 function foo() {}
				asyncArrow: "always" // 异步箭头函数前必须有空格 async () => {}
			}
		],
		"arrow-spacing": ["error", { before: true, after: true }], // 箭头函数前后必须有空格
		"@typescript-eslint/no-empty-function": "off", // 关闭禁止空函数的规则
		"vue/prop-name-casing": ["error", "camelCase"], // 强制 prop 名称使用驼峰式命名
		"vue/attribute-hyphenation": "off", // 关闭 vue 属性必须使用连字符命名的限制（允许驼峰和连字符）
		"newline-per-chained-call": ["error", { ignoreChainWithDepth: 4 }], // 连续调用时，链式调用深度超过4时才强制换行
		"import/order": [
			// import 语句的排序规则
			"error",
			{
				groups: [
					"builtin", // Node.js 内置模块
					"external", // 外部依赖模块
					"internal", // 内部模块
					["parent", "sibling", "index"], // 父目录，兄弟目录，当前目录模块
					"object", // 对象导入
					"type" // 类型导入
				],
				"newlines-between": "always", // 分组之间必须有空行
				alphabetize: {
					order: "asc", // 按字母升序排序
					caseInsensitive: true // 排序忽略大小写
				}
			}
		]
	}
};
