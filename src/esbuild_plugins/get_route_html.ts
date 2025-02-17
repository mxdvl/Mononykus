import { format } from "prettier";

interface TemplateOptions {
	head: string;
	html: string;
}

const template = ({ head, html }: TemplateOptions) =>
	`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		${head}
	</head>
	<body>
		${html}
	</body>
</html>
`;

export const get_route_html = ({ html, head }: {
	html: string;
	head: string;
}): Promise<string> => {
	const page = template({ head, html });

	try {
		return format(
			page,
			{
				parser: "html",
				useTabs: true,
				htmlWhitespaceSensitivity: "css",
				bracketSameLine: true,
			},
		);
	} catch (_) {
		console.warn("Could not format the html");
		return Promise.resolve(page);
	}
};
