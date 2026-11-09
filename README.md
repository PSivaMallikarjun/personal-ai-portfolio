
# Siva Mallikarjun Parvatham — Portfolio & Model Atlas

This workspace contains Siva Mallikarjun Parvatham's portfolio and interactive AI model projects. The LLM walkthrough originated in [Brendan Bycroft's `llm-viz` project](https://github.com/bbycroft/llm-viz); its MIT license and copyright notice are retained. The portfolio and the Model Atlas presentation are maintained separately in this workspace.

**License:** See [`LICENSE`](LICENSE) for the upstream MIT terms. Third-party assets and any explicitly excluded upstream materials retain their original rights and licenses.

## Projects

The main projects are:
* Token walkthrough: an interactive explanation of a small GPT-style model.
* AI Model Atlas: a source-linked catalog of model families, versions, modalities, and research systems.
* [WIP] CPU Simulation: A 2D digital schematic editor with full a execution model, showcasing a simple
  RISC-V based CPU

### LLM Visualization

This project displays a 3D model of a working implementation of a GPT-style network. That
is, the network topology that's used in OpenAI's GPT-2, GPT-3, (and maybe GPT-4).

The first network displayed with working weights is a tiny such network, which sorts a small list
of the letters A, B, and C. This is the demo example model from Andrej Karpathy's
[minGPT](https://github.com/karpathy/minGPT) implementation.

The renderer also supports visualizing arbitrary sized networks, and works with the smaller gpt2
size, although the weights aren't downloaded (it's 100's of MBs).

### AI Model Atlas

The Model Atlas under `/llm/models` converts the named model families, generations, modalities, and specialist systems in the user-provided *Worldwide AI Model Catalogue 2026* into individual searchable profiles. Each profile has its own responsive, interactive 3D learning illustration: a conceptual flow for learning purposes, not a reconstruction of any provider's implementation. Model briefs summarize intended tasks, input/output modalities, verification links, and access notes. As the supplied PDF explains, this is a curated discovery catalogue—not an exhaustive census of every checkpoint, endpoint, or fine-tune worldwide. Verify current IDs, availability, and license details in the linked provider sources.

The separate Atlas, its illustrations, and portfolio interface are designed for this project. The token walkthrough is based on Brendan Bycroft's `llm-viz`; its upstream MIT license and copyright notices are retained.
The model catalog is integrated into the LLM visualization workspace. The legacy `/models` route
redirects to `/llm/models`.

### CPU Simulation (WIP; not exposed yet!)

This project runs 2D schematic digital circuits, with a fully fledged editor. The intent is to
add a number of walkthroughs, showing things such as:
  * how a simple RISC-V CPU is constructed
  * the constituent parts down to gate level: instruction decode, ALU, add, etc
  * higher level CPU ideas, like various levels of pipelining, caching, etc

## Running Locally

1. Install dependencies: `yarn`
1. Start the dev server: `yarn dev`
