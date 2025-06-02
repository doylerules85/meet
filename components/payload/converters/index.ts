import {
    DefaultNodeTypes,
    SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import {
    JSXConvertersFunction,
    LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react";

import { internalDocToHref } from "@/components/payload/converters/internal-link";
import { headingConverter } from "@/components/payload/converters/heading-converter";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode;

export const jsxConverter: JSXConvertersFunction<NodeTypes> = (
    { defaultConverters },
) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    ...headingConverter,
});
