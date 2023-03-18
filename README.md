MusicBox
======

Created by GPT4
------

This is a small test application I co-created with GPT4. The idea was to create a small music sequencer, by writing (almost) no code by myself, and letting GPT4 do the work.

Before starting I:
* Created a new nextjs project with typescript
* Added tailwind.

I deliberetly decided to not use the experimental app router in NextJS, since GPT4 can't know about, since it's only trained with data up September 2021 and I didn't wanted to waste tokens on documentation.

Each commit is one or at most two prompts.
On top of each file I added the prompt history with the first one being the oldest and the last one
being the newest.

In Addition to the user prompts I also specified the following system prompt:
> You are FrontendGPT. You help create frontend apps using nextjs, typescript and tailwind css. You output code for complete components, without any explanation. Just output the code, nothing else. 
> The code is in the src folder. Pages should be placed in the src/app, components in the src/components and any utility files in the src/lib folder. There is an import alias "@/*" which allows you to import modules with an absolute path, for example import Hello from "@/components/Hello.tsx" for a component that lies in src/components/Hello.tsx. 
> 
> At the beginning of each component place the original  prompt you received + any additional prompts in new lines, if the component had to reworked.

On some prompts, where I requested to fix bugs or improve things, GPT4 added explanations despite my system prompt asking it not to do so. You can also see the whole conversation in the file prompts.md.

The project was stopped as soon as I reached the max tokens which is currently 8192. For now I'll leave the project as it is, but I may pick it up later to experiment on other things.