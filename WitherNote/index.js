let fontSize = 1;

window.onload = init;

function init() {

    // First line must exist
    $('.line').keydown(keydownHandler);

    // Zoom function
    $(document).keydown((e) => {
        // CTRL +
        if (e.ctrlKey && e.which == 107) {

            fontSize++;

            $('.line').css('font-size', `${fontSize}em`);
            $('.number-col').css('font-size', `${fontSize}em`);

            e.preventDefault();
        }

        if (e.ctrlKey && e.which == 109) {

            if (fontSize - 1 > 0) {
                fontSize--;
            }

            $('.line').css('font-size', `${fontSize}em`);
            $('.number-col').css('font-size', `${fontSize}em`);

            e.preventDefault();
        }
    });
}

function keydownHandler(e) {
    // For key codes use: https://keycode.info/

    // Enter Key
    if (e.which == 13) {

        // Prevent default enter adding div and br
        e.preventDefault();

        // Add the new line after the current one
        $(this).after('<span class="line" contenteditable="true"></span>');

        // Focus on the newly added line
        const currentLineIndex = $(this).index();
        const newline = $('.text').children().eq(currentLineIndex + 1);
        newline.focus();

        // Add the same event to the line
        newline.keydown(keydownHandler);

        // Update zoom
        newline.css('font-size', `${fontSize}em`);

        // Add to the numberCol
        const numberCol = $('.number-col');
        numberCol.append(`<span>${numberCol.children().length + 1}</span>`);
        // Update zoom
        numberCol.css('font-size', `${fontSize}em`);
    }

    // Delete key
    if (e.which == 8) {

        /* 
            Check if the line is empty and if it is delete it
            and focus on the one before it
        */
        if ($(this).text().length == 0 && $(this).index() != 0) {

            const currentLineIndex = $(this).index();
            const previousline = $('.text').children().eq(currentLineIndex - 1);

            // Delete the line
            $(this).remove();

            // Set cursor position to the end of text, automaticaly calls focus()
            placeCaretAtEnd(previousline.get(0));

            // Prevent default delete function because it tries to delete on the previousLine
            e.preventDefault();

            // Remove the number on numberCol
            const numberCol = $('.number-col');
            if (numberCol.children().length != $('.text').children().length) {
                numberCol.children().last().remove();
            }
        }

    }

    // Arrow up
    if (e.which == 38) {

        if ($(this).index() != 0) {
            const currentLineIndex = $(this).index();
            const previousline = $('.text').children().eq(currentLineIndex - 1);

            // Set cursor position to the end of text, automaticaly calls focus()
            placeCaretAtEnd(previousline.get(0));

            e.preventDefault();
        }
    }

    // Arrow down
    if (e.which == 40) {

        if ($(this).index() < $('.text').children().last().index()) {
            const currentLineIndex = $(this).index();
            const nextline = $('.text').children().eq(currentLineIndex + 1);

            // Set cursor position to the end of text, automaticaly calls focus()
            placeCaretAtEnd(nextline.get(0));

            e.preventDefault();
        }
    }
}

/*
    Copy from https://stackoverflow.com/a/4238971
    Sets cursor to the end of a node
    Paramaters:
    el - an HTML5 element (document.getElementById or similar)
*/
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}