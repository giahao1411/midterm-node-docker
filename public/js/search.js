$(document).ready(function() {
    $('#searchForm').on('submit', function(e) {
        e.preventDefault(); // prevent page reloads

        const query = $('#searchInput').val(); // get the search value

        if (!query.trim()) {
            alert('Vui lòng nhập từ khóa tìm kiếm!');
            return;
        }

        $.ajax({
            url: '/search',
            method: 'GET',
            data: { query: query },
            success: function(response) {
                $('#searchResults').html(response);
                $('#mainContent').hide(); // hide main content 
                $('html, body').animate({ scrollTop: $('#searchResults').offset().top }, 500);
            },
            error: function() {
                alert('Có lỗi xảy ra trong quá trình tìm kiếm.');
            }
        });
    });
});
