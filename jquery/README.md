# jQuery Learning Journey 📚

Welcome to your jQuery learning files! Open these HTML files in your browser to learn interactively.

## Files Overview

| File | Topic | What You'll Learn |
|------|-------|-------------------|
| `01-basics.html` | Selectors & Document Ready | `$()`, `$(document).ready()`, ID/class/tag selectors |
| `02-dom-manipulation.html` | DOM Manipulation | `.text()`, `.html()`, `.css()`, `.addClass()`, `.append()` |
| `03-events.html` | Event Handling | `.click()`, `.on()`, `$(this)`, event delegation |
| `04-effects-animations.html` | Effects & Animations | `.hide()`, `.fadeIn()`, `.slideUp()`, `.animate()` |
| `05-traversal.html` | DOM Traversal | `.parent()`, `.children()`, `.find()`, `.siblings()` |
| `06-ajax.html` | AJAX Requests | `$.get()`, `$.post()`, `$.ajax()`, JSON handling |
| `07-todo-project.html` | Practice Project | Complete todo app using all concepts |

## How to Use

1. Open each file in your browser (just double-click the HTML file)
2. Read the code in the `<script>` section
3. Click buttons to see jQuery in action
4. Open browser DevTools (F12) to experiment in the console

## Learning Path

1. **Start with `01-basics.html`** - Understand selectors
2. **Move to `02-dom-manipulation.html`** - Change page content
3. **Learn `03-events.html`** - React to user actions
4. **Explore `04-effects-animations.html`** - Add visual flair
5. **Study `05-traversal.html`** - Navigate the DOM
6. **Master `06-ajax.html`** - Fetch data from servers
7. **Build `07-todo-project.html`** - Put it all together!

## Quick Reference

```javascript
// Document Ready
$(function() { /* code */ });

// Selectors
$('#id')           // by ID
$('.class')        // by class
$('tag')           // by tag

// DOM Manipulation
$('#el').text('new text');
$('#el').html('<b>HTML</b>');
$('#el').css('color', 'red');
$('#el').addClass('active');

// Events
$('#btn').click(function() { });
$('#parent').on('click', '.child', function() { });

// Effects
$('#el').hide();
$('#el').fadeIn(500);
$('#el').slideToggle();

// AJAX
$.get('/api/data', function(data) { });
$.post('/api/save', {key: 'value'}, function(res) { });
```

## Tips

- Use `console.log()` to debug
- Chain methods: `$('#el').addClass('a').fadeIn().text('Hi')`
- Use `$(this)` inside event handlers
- Prefer `.on()` for event delegation

Happy learning! 🚀
