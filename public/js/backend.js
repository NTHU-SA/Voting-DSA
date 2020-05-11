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
        // TODO: 建立編輯頁面
    },
};

function detailFormatter(index, row) {
    var html = [];
    var resp = $.ajax({
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
    const votes = getVotes();
    if (resp) {
        const candidates = resp.data;
        html.push('<b>候選人：</b><ol>')
        candidates.forEach((item) => {
            // TOOD: 投票結果排序
            const candidate = item.candidate;
            const id = item._id;
            var vote_result = "";
            if (votes[id] !== undefined) {
                const vote = votes[id];
                $.each(vote, (k, v) => {
                    vote_result += `${k}: ${v}`;
                });
            }
            html.push(`<li>${candidate.name} - ${candidate.department}`);
            if (votes[id] !== undefined) {
                const vote = votes[id];
                html.push('<ul>');
                $.each(vote, (k, v) => {
                    html.push(`${k}: ${v}`);
                });
                html.push('</ul>');
            }
            html.push('</li>');
        });
        html.push('</ol>')
        return html.join("");
    }
}

function getVotes(activityId) {
    var resp = $.ajax({
        url: "/votes/getVotes",
        data: JSON.stringify({
            filter: {
                activity_id: activityId,
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
        const votes = resp.data;
        var statics = {};
        votes.forEach(vote => {
            (vote.choose_all).forEach(candidate => {
                var remark = candidate.remark;
                // 加入該候選人
                if (statics[candidate.option_id] === undefined) {
                    statics[candidate.option_id] = {};
                } 
                // 加入該投票選項
                if (statics[candidate.option_id][remark] === undefined) {
                    statics[candidate.option_id][remark] = 1;
                } else {
                    statics[candidate.option_id][remark] += 1;
                }
            })
        });
        return statics;
    }
}
