virtual DOM :-

## Virtual DOM

The Virtual DOM is a JavaScript representation of the actual DOM kept in memory.

**How it works:**

- React creates a virtual representation of the UI
- On state changes, a new Virtual DOM tree is created
- React compares (diffs) new tree with previous tree
- Only differences are updated in real DOM

**Benefits:**

- Better performance through batch updates
- Minimal DOM manipulation
- Predictable UI updates
- Cross-browser compatibility

**Process:** State Change → New Virtual DOM → Diffing → Real DOM Update

This makes React apps faster by avoiding direct DOM manipulation for every change.
