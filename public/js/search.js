$(document).ready(function() {
    $('#searchForm').on('submit', function(e) {
        e.preventDefault(); 
        const query = $('#searchInput').val().trim(); 
        if (!query) {
            alert('Vui lòng nhập từ khóa tìm kiếm!');
            return;
        }

        $.ajax({
            url: '/search',
            method: 'GET',
            data: { query: query },
            success: function(response) {
                $('#searchResults').html(response);
                $('#mainContent').hide(); 
                $('html, body').animate({ scrollTop: $('#searchResults').offset().top }, 500);

                history.pushState({ query: query }, '', `/search?query=${encodeURIComponent(query)}`);
            },
            error: function() {
                alert('Có lỗi xảy ra trong quá trình tìm kiếm.');
            }
        });
    });
    window.onpopstate = function () {
        history.replaceState(null, '', '/course'); 
        $('#searchResults').html(''); 
        $('#mainContent').show(); 
    };
    
});