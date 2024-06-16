$(document).ready(function() {
    $('.dropdown').each(function() {
        var $dropdown = $(this);
        var $button = $dropdown.find('.btn');
        var $menuItems = $dropdown.find('.dropdown-item');

        $menuItems.click(function() {
            var selectedText = $(this).text();
            $button.text(selectedText);
        });
    });
});