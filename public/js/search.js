$(document).ready(function() {
    $('#searchForm').on('submit', function(e) {
        e.preventDefault(); // Ngăn chặn reload trang

        const query = $('#searchInput').val().trim(); // Lấy giá trị tìm kiếm

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
                $('#mainContent').hide(); // Ẩn nội dung chính
                $('html, body').animate({ scrollTop: $('#searchResults').offset().top }, 500);

                // Cập nhật URL mà không tải lại trang
                history.pushState({ query: query }, '', `/search?query=${encodeURIComponent(query)}`);
            },
            error: function() {
                alert('Có lỗi xảy ra trong quá trình tìm kiếm.');
            }
        });
    });

    // Lắng nghe sự kiện popstate để xử lý khi người dùng quay lại trang trước đó
    window.addEventListener('popstate', function(event) {
        // Kiểm tra nếu không có event.state hoặc không có query trong state, thì tải lại danh sách tất cả khóa học
        if (!event.state || !event.state.query) {
            // Tải lại trang tất cả khóa học
            window.location.href = '/course';
        } else {
            // Nếu có query trong state, thực hiện lại tìm kiếm với query đó
            const query = event.state.query;
            $.ajax({
                url: '/search',
                method: 'GET',
                data: { query: query },
                success: function(response) {
                    $('#searchResults').html(response);
                    $('#mainContent').hide();
                    $('html, body').animate({ scrollTop: $('#searchResults').offset().top }, 500);
                },
                error: function() {
                    alert('Có lỗi xảy ra trong quá trình tìm kiếm.');
                }
            });
        }
    });
});

