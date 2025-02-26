// 定义一个简单的语言映射类型
export type Lang = {
	[key: string]: string | LangItem;
};

// 定义一个更具体的内容类型，避免自引用
type LangItem = string | { [key: string]: string };

// 定义一个辅助类型来递归获取对象的所有属性路径
type ExtractPaths<
	T,
	Path extends string = '',
	Paths extends string[] = []
> = T extends object
	? {
			[K in keyof T]: K extends string
				? ExtractPaths<
						T[K],
						`${Path}${Path extends '' ? '' : '.'}${K}`,
						[...Paths, `${Path}${Path extends '' ? '' : '.'}${K}`]
					>
				: never;
		}[keyof T]
	: Paths[number];

export type LocalType<T> = {
	[P in ExtractPaths<T>]: T[P extends keyof T ? P : never];
};
