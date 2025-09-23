/**
 * Test cases for virtual DOM diffing.
 * Each test case contains a "before" and "after" tree.
 * "after" trees include `class: "updated"` to highlight changes.
 *
 * @typedef {Object} VNode
 * @property {string} type - Element type (e.g., "div", "h1").
 * @property {Object<string,string>} [props] - Element attributes.
 * @property {(VNode|string)[]} [children] - Child nodes (strings = text nodes).
 */

/**
 * A collection of test cases.
 * @type {Object<number, {before: VNode, after: VNode}>}
 */
const TEST_CASES = {
  1: {
    before: {
      type: "div",
      props: { id: "root" },
      children: [
        { type: "h1", props: {}, children: ["Hello World"] },
        { type: "p", props: {}, children: ["This is a simple paragraph."] }
      ]
    },
    after: {
      type: "div",
      props: { id: "root" },
      children: [
        { type: "h1", props: {}, children: ["Hello World"] },
        {
          type: "p",
          props: { class: "updated" },
          children: ["This paragraph has been updated."]
        }
      ]
    }
  },

  2: {
    before: {
      type: "div",
      props: {id: "root"},
      children: [
        { type: "h1", props: {}, children: ["My Blog"] },
        { type: "p", props: {}, children: ["Welcome to my blog."] },
        {
          type: "ul",
          props: {},
          children: [
            { type: "li", props: {}, children: ["Post 1"] },
            { type: "li", props: {}, children: ["Post 2"] }
          ]
        }
      ]
    },
    after: {
      type: "div",
      props: {id: "root"},
      children: [
        { type: "h1", props: { class: "updated" }, children: ["My Awesome Blog"] },
        { type: "p", props: { class: "updated" }, children: ["Welcome to my updated blog."] },
        {
          type: "ul",
          props: {},
          children: [
            { type: "li", props: {}, children: ["Post 1"] },
            { type: "li", props: { class: "updated" }, children: ["Post 2 (Edited)"] },
            { type: "li", props: { class: "updated" }, children: ["Post 3 (New)"] }
          ]
        }
      ]
    }
  },

  3: {
    before: {
      type: "div",
      props: { id: "root" },
      children: [
        { type: "header", props: {}, children: [
          { type: "h1", props: {}, children: ["My Site"] },
          { type: "nav", props: {}, children: [
            { type: "ul", props: {}, children: [
              { type: "li", props: {}, children: [
                { type: "a", props: { href: "#home" }, children: ["Home"] }
              ]},
              { type: "li", props: {}, children: [
                { type: "a", props: { href: "#about" }, children: ["About"] }
              ]},
              { type: "li", props: {}, children: [
                { type: "a", props: { href: "#contact" }, children: ["Contact"] }
              ]}
            ]}
          ]}
        ]},
        { type: "main", props: {}, children: [
          { type: "section", props: {}, children: [
            { type: "h2", props: {}, children: ["Welcome"] },
            { type: "p", props: {}, children: ["This is my website."] }
          ]}
        ]},
        { type: "footer", props: {}, children: ["Copyright 2025"] }
      ]
    },
    after: {
      type: "div",
      props: { id: "root" },
      children: [
        { type: "header", props: {}, children: [
          { type: "h1", props: { class: "updated" }, children: ["My Awesome Site"] },
          { type: "nav", props: {}, children: [
            { type: "ul", props: {}, children: [
              { type: "li", props: {}, children: [
                { type: "a", props: { href: "#home", class: "active" }, children: ["Home"] }
              ]},
              { type: "li", props: {}, children: [
                { type: "a", props: { href: "#about" }, children: ["About Us"] }
              ]},
              { type: "li", props: {}, children: [
                { type: "a", props: { href: "#contact", class: "updated" }, children: ["Contact"] }
              ]}
            ]}
          ]}
        ]},
        { type: "main", props: {}, children: [
          { type: "section", props: {}, children: [
            { type: "h2", props: {}, children: ["Welcome"] },
            { type: "p", props: { class: "updated" }, children: ["This is my updated website."] }
          ]}
        ]},
        { type: "footer", props: { class: "updated" }, children: ["© 2025 My Site"] }
      ]
    }
  },
  /* 
   * Testing: original node type change, update props
   */
  4: {  
    before: {
      type: "h1", 
      props: { class: "original" }, 
      children: ["Heading"]
    }, 
    after: {
      type: "h2", 
      props: { class: "updated" }, 
      children: ["Smaller heading"]
    },
  },
  /*
   * Testing: child node type change, element deletion, property inheritance
   */
  5: {
    before: {
      type: "div", 
      props: { id: "root" }, 
      children: [
        { type: "h1", props: { class: "big-header" }, children: ["HERE IS A LARGE TITLE"] },
        { type: "ul", 
          props: {}, 
          children: [
            { type: "li", props: {}, children: ["1st"] }, 
            { type: "li", props: {}, children: ["2nd"] },
            { type: "li", props: {}, children: ["3rd"] },
          ]
        },
        { type: "p", props: {}, children: ["This paragraph will disappear."] },
        { type: "p", props: {}, children: ["And this one will transform!"] },
      ]
    }, after: {
      type: "div", 
      props: { id: "root" }, 
      children: [
        { type: "h5", props: { class: "small-header updated" }, children: ["Smaller Header"] },
        { type: "ul", 
          props: {}, 
          children: [
            { type: "li", props: {}, children: ["1st"] }, 
            { type: "li", props: {}, children: ["3rd"] },
          ]
        },
        { type: "ol",
          props: { class: "updated"}, 
          children: [
            { type: "li", props: {}, children: ["list"] },
            { type: "li", props: {}, children: ["items"] },
          ] 
        },
      ]
    },
  },
};
