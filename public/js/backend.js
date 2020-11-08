chartQueue = [];
// 改善 chart.js 解析度
window.devicePixelRatio = 3;

function showActivity(resp) {
    const data = resp.data.data;
    const $table = $('#table');
    $table.bootstrapTable({
        data: data,
    });
}
async function getActivity() {
    try {
        await axios.post('/activities/getActivities').then(showActivity);
    } catch (error) {
        alert('發生錯誤，請重新整理此頁面😥');
    }
}

getActivity();
setInterval(drawChart, 500);

function operateFormatter(value, row, index) {
    return [
        '<a class="edit" href="javascript:void(0)" title="edit">',
        '<i class="fas fa-edit"></i>',
        '</a>  ',
    ].join('');
}

window.operateEvents = {
    'click .edit': function(e, value, row, index) {
        // TODO: 建立編輯頁面
    },
};

function detailFormatter(index, row) {
    const html = [];
    const resp = $.ajax({
        url: '/options/getOptions',
        data: JSON.stringify({
            filter: {
                activity_id: row._id,
            },
        }),
        type: 'POST',
        dataType: 'json',
        headers: { Authorization: `Bearer ${jwtToken}` },
        contentType: 'application/json;charset=utf-8',
        async: false,
        success: function(resp) {
            return resp;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert('發生錯誤，請重新整理此頁面😥');
            return false;
        },
    }).responseJSON;
    if (resp) {
        const candidates = resp.data;
        const candidatesIdMapping = {};
        const result = getVotes(row._id, candidates);
        const voteStatics = result.statics;
        votes = result.votes;
        html.push('<b>候選人：</b><ol>');
        candidates.forEach((item) => {
            // TOOD: 投票結果排序
            const candidate = item.candidate;
            const id = item._id;
            candidatesIdMapping[id] = candidate.name;
            let vote_result = '';
            if (voteStatics[id] !== undefined) {
                const vote = voteStatics[id];
                $.each(vote, (k, v) => {
                    vote_result += `${k}: ${v}`;
                });
            }
            html.push(`<li>${candidate.name} - ${candidate.department}`);
            if (voteStatics[id] !== undefined) {
                const vote = voteStatics[id];
                html.push('<ul>');
                $.each(vote, (k, v) => {
                    html.push(`<li>${k}: ${v}</li>`);
                });
                html.push('</ul>');
                const chartId = `chart-${makeId(10)}`;
                html.push(`<div class="col-md-7"><canvas id="${chartId}"></canvas></div>`);
                chartQueue.push({ name: candidate.name, chartId, vote });
            }
            html.push('</li>');
        });
        html.push('</ol>');
        // 驗票
        let verificationBody = '';
        verificationBody += '<ol>';
        votes.forEach((vote) => {
            vote.choose_all.forEach((candidate) => {
                candidateName = candidatesIdMapping[candidate.option_id];
                verificationBody += `<li>Token: ${vote.token}: ${candidateName}: ${candidate.remark}</li>`;
            });
        });
        verificationBody += '</ol>';
        html.push(addModal(row._id, verificationBody));
        html.push(`
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#verification-${row._id}">
            驗票
        </button>
        `);
        return html.join('');

        function addModal(id, content) {
            return `
            <div class="modal fade" id="verification-${id}" tabindex="-1" role="dialog" aria-labelledby="verificationTitle-${id}"
                aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="verificationTitle-${id}">驗票</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="verificationBody-${id}">${content}</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                關閉
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
}

function getVotes(activityId, candidates) {
    const resp = $.ajax({
        url: '/votes/getVotes',
        data: JSON.stringify({
            filter: {
                activity_id: activityId,
            },
        }),
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        headers: { 'Authorization': `Bearer ${jwtToken}` },
        async: false,
        success: function(resp) {
            return resp;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert('發生錯誤，請確認您是否擁有管理員權限！');
            return false;
        },
    }).responseJSON;
    if (resp) {
        const votes = resp.data;
        const statics = {};
        candidates.forEach((item) => {
            // 加入該候選人
            statics[item._id] = {
                '我要投給他': 0,
                '我不投給他': 0,
                '我沒有意見': 0,
            };
        });
        votes.forEach((vote) => {
            (vote.choose_all).forEach((candidate) => {
                const remark = candidate.remark;
                // 加入該投票選項
                statics[candidate.option_id][remark] += 1;
            });
        });
        return { 'statics': statics, 'votes': votes };
    }
}

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function drawChart() {
    for (let i = 0; i < chartQueue.length; i++) {
        const element = chartQueue[i];
        if (element.drawn == true) continue;
        const ctx = document.getElementById(element.chartId);
        if (ctx == undefined) continue;
        const label = Object.keys(element.vote);
        const data = Object.values(element.vote);
        new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#4d72bd',
                        '#dd8143',
                        '#a3a3a3',
                        '#42f57e',
                    ],
                    label: element.name,
                }],
                labels: label,
            },
            options: {
                responsive: true,
                animation: {
                    duration: 500,
                    easing: 'easeOutQuart',
                    onComplete: function() {
                        const ctx = this.chart.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function(dataset) {
                            for (let i = 0; i < dataset.data.length; i++) {
                                const model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                                const total = dataset._meta[Object.keys(dataset._meta)[0]].total;
                                const mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2;
                                const start_angle = model.startAngle;
                                const end_angle = model.endAngle;
                                const mid_angle = start_angle + (end_angle - start_angle) / 2;

                                const x = mid_radius * Math.cos(mid_angle);
                                const y = mid_radius * Math.sin(mid_angle);

                                ctx.fillStyle = '#fff';
                                if (i == 3) { // Darker text color for lighter background
                                    ctx.fillStyle = '#444';
                                }
                                const percent = String(Math.round(dataset.data[i] / total * 100)) + '%';
                                // Don't Display If Legend is hide or value is 0
                                // if (dataset.data[i] != 0 && dataset._meta[0].data[i].hidden != true) {
                                ctx.fillText(dataset.data[i], model.x + x, model.y + y);
                                // Display percent in another line, line break doesn't work for fillText
                                ctx.fillText(percent, model.x + x, model.y + y + 15);
                                // }
                            }
                        });
                    },
                },
            },
        });
        element['drawn'] = true;
    }
}
