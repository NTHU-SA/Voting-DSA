function showActivity(resp) {
    const data = resp.data.data;
    var $table = $("#table");
    $table.bootstrapTable({
        data: data
    });
}
async function getActivity() {
    try {
        await axios.post("/activities/getActivities", {}).then(showActivity);
    } catch (error) {
        alert("發生錯誤，請重新整理此頁面😥");
    }
}
getActivity();

function operateFormatter(value, row, index) {
    return [
        '<a class="edit" href="javascript:void(0)" title="edit">',
        '<i class="fas fa-edit"></i>',
        "</a>  ",
    ].join("");
}

window.operateEvents = {
    "click .edit": function(e, value, row, index) {
        console.log(row._id);
        //   TODO: 建立編輯頁面
    },
};

function detailFormatter(index, row) {
    var html = [];
    resp = $.ajax({
        url: "/options/getOptions",
        data: JSON.stringify({
            filter: {
                activity_id: row._id,
            },
        }),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        async: false,
        success: function(resp) {
            return resp;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert("發生錯誤，請重新整理此頁面😥");
            return false;
        },
    }).responseJSON;
    if (resp) {
        const candidates = resp.data;
        html.push('<b>候選人：</b><ol>')
        candidates.forEach((item) => {
            // TOOD: 投票結果
            let candidate = item.candidate;
            html.push(`<li>${candidate.name}: ${candidate.department}</li>`);
        });
        return html.join("");
    }
}
