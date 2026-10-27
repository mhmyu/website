import type { MDXComponents } from 'mdx/types'

// Maps Markdown elements to styled elements. The page <h1> is the note title,
// so note bodies start at <h2>.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2 className="mt-10 mb-3 text-xl font-semibold" {...props} />
    ),
    h3: (props) => (
      <h3 className="mt-8 mb-2 text-lg font-semibold" {...props} />
    ),
    p: (props) => <p className="my-4 leading-7" {...props} />,
    a: (props) => (
      <a className="underline underline-offset-4 hover:opacity-70" {...props} />
    ),
    ul: (props) => <ul className="my-4 list-disc space-y-1 pl-6" {...props} />,
    ol: (props) => (
      <ol className="my-4 list-decimal space-y-1 pl-6" {...props} />
    ),
    li: (props) => <li className="leading-7" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-2 border-card-border pl-4 italic opacity-80"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded-md bg-card/10 px-1.5 py-0.5 font-mono text-[0.9em]"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto rounded-card border border-callout-border/30 bg-callout/50 p-4 font-mono text-[0.85rem] [&_code]:bg-transparent [&_code]:p-0"
        {...props}
      />
    ),
    hr: (props) => <hr className="my-8 border-callout-border/30" {...props} />,
    ...components,
  }
}
