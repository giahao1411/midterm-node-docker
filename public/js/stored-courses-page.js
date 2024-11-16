var courseId;

document.addEventListener("DOMContentLoaded", function () {
    var deleteForm = document.forms["delete-course-form"];
    var btnDeleteCourse = document.getElementById("btn-delete-course");
    var checkboxAll = $("#checkbox-all");
    var courseItemCheckbox = $('input[name="courseIds[]"]');
    var checkAllSubmitBtn = $(".check-all-submit-btn");

    $(document).on("click", "a[data-id]", function () {
        courseId = $(this).data("id");
    });

    // When delete course btn clicked
    btnDeleteCourse.onclick = function () {
        deleteForm.action = "/course/delete/" + courseId + "?_method=DELETE";
        deleteForm.submit();
    };

    // Checkbox all clicked
    checkboxAll.change(function () {
        var isCheckedAll = $(this).prop("checked");
        courseItemCheckbox.prop("checked", isCheckedAll);
        renderCheckAllSubmitBtn();
    });

    // Course item checkbox changed
    courseItemCheckbox.change(function () {
        var isCheckedAll =
            courseItemCheckbox.length ===
            $('input[name="courseIds[]"]:checked').length;
        checkboxAll.prop("checked", isCheckedAll);
        renderCheckAllSubmitBtn();
    });

    // Re-render check all submit button
    function renderCheckAllSubmitBtn() {
        var checkedCount = $('input[name="courseIds[]"]:checked').length;
        if (checkedCount > 0) {
            checkAllSubmitBtn.attr("disabled", false);
        } else {
            checkAllSubmitBtn.attr("disabled", true);
        }
    }
});

async function getCourseInformationById(id) {
    try {
        const response = await fetch(`http://localhost:3000/course/get/${id}`);
        if (!response.ok) throw new Error("Failed to connect to server");

        const data = await response.json();
        console.log(data);

        var deleteCourseName = document.getElementById("delete-course-name");
        courseId = data._id;
        deleteCourseName.innerHTML = data.name;
    } catch (err) {
        console.error(err);
    }
}
