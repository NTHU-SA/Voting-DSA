const chartQueue = [];
const timeChartQueue = [];
// 改善 chart.js 解析度
window.devicePixelRatio = 3;
errorReloadText = '發生錯誤，請重新整理此頁面😥';

getActivity();
setInterval(drawChart, 500);
setInterval(drawTimeChart, 500);

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
        alert(errorReloadText);
    }
}

async function editActivity(id) {
    try {
        await axios.post('/activities/getActivity', { _id: id }).then((resp) => {
            data = resp.data;
            console.log(data);
            if ($(`#modal-${id}`)[0] != undefined) {
                modal = $(`#modal-${id}`).remove();
            }
            // pre-config
            modal = $('#modal').clone();
            modal[0].id = `modal-${id}`;
            modal.find('#modalTitle')[0].id = `modalTitle-${id}`;
            modal.find(`#modalTitle-${id}`)[0].innerHTML = `編輯：${data.name}`;
            modal.find('#modalBody')[0].innerHTML = "";
            modal.find('#modalBody')[0].id = `modalBody-${id}`;
            modal.insertAfter($('#modal'));

            // edit name
            $('<input />', { value: data.name });
            name_input = $('<input />', { id: `${id}-name`, value: data.name });
            name_label = $('<label>').text('活動名稱: ');
            name_input.appendTo(name_label);
            modal.find(`#modalBody-${id}`).append(name_label);
            modal.find(`#modalBody-${id}`).append($('<br />'));

            // time format info
            info = $('<p>', { text: '時間格式範例：2020-06-04T04:00:00.000Z，需注意這是 GMT+0 時間，也就是台灣時間 2020/06/04 中午 12 點整，請自行換算。' });
            modal.find(`#modalBody-${id}`).append($('<br />'));
            modal.find(`#modalBody-${id}`).append(info);

            // edit time
            open_from_label = $('<label>').text('開放時間: ');
            $('<input />', { id: `${id}-open-from`, value: data.open_from }).appendTo(open_from_label);
            modal.find(`#modalBody-${id}`).append(open_from_label);
            modal.find(`#modalBody-${id}`).append($('<br />'));
            open_to_label = $('<label>').text('結束時間: ');
            $('<input />', { id: `${id}-open-to`, value: data.open_to }).appendTo(open_to_label);
            modal.find(`#modalBody-${id}`).append(open_to_label);
            modal.find(`#modalBody-${id}`).append($('<br />'));

            // save button
            save_btn = $('<button />', { class: 'btn btn-sm btn-info', text: 'save' }).click(() => { updateActivity(id) });
            modal.find(`#modalBody-${id}`).append($(save_btn));
            // add edit candidate data
            edit_candidates = $('<button />', { class: 'btn btn-link pull-right', text: '編輯候選人' }).click(() => { editCandidate(id, modal) });
            modal.find(`#modalBody-${id}`).append(edit_candidates);


            // trigger modal
            $(`#modal-${id}`).modal();
        });
    } catch (error) {
        alert(errorReloadText);
        console.log(error);
    }
}

async function editCandidate(activity_id, previous_modal) {
    let id = `candidate-${activity_id}`;
    // close previous modal
    previous_modal.modal('toggle');
    //console.log(activity_id);
    try {
        await axios.post('/options/getOptions', { filter: { activity_id } }).then((resp) => {
            data = resp.data.data;
            if ($(`#modal-${id}`)[0] != undefined) {
                modal = $(`#modal-${id}`).remove();
            }
            // pre-config
            modal = $('#modal').clone();
            modal[0].id = `modal-${id}`;
            modal.find('#modalTitle')[0].id = `modalTitle-${id}`;
            modal.find(`#modalTitle-${id}`)[0].innerHTML = `編輯候選人`;
            modal.find('#modalBody')[0].innerHTML = "";
            modal.find('#modalBody')[0].id = `modalBody-${id}`;
            modal.insertAfter($('#modal'));

            accordion = $('<div />', { class: 'accordion', id: `accordion-${id}` });
            modal.find(`#modalBody-${id}`).append(accordion);

            data.forEach((candidate, index) => {
                candidate_info = candidate.candidate;
                //console.log("candidate_info",candidate_info);
                vice1_info = null;
                if(candidate.vice1){
                    vice1_info = candidate.vice1;
                    //console.log("vice1_info",vice1_info);
                }
                vice2_info = null;
                if(candidate.vice1){
                    vice2_info = candidate.vice2;
                    //console.log("vice2_info",vice2_info);
                }

                card = $('<div />', { class: 'card', id:`${candidate._id}-card`});
                accordion.append(card);
                
                cardHeader = $('<div />', { class: 'card-header row', id: `${id}-heading-${index}` });
                card.append(cardHeader);

                // Add Feature: Remove Option (2022.3)
                col_1 = $('<div />', { class: 'col-10' });
                headerBtn = $('<button />', { class: 'btn btn-link btn-block', text: candidate_info.name });
                headerBtn.attr('data-toggle', 'collapse');
                headerBtn.attr('data-target', `#${id}-collapse-${index}`);
                headerBtn.attr('aria-expanded', 'false');
                headerBtn.attr('aria-controls', `${id}-collapse-${index}`);
                col_1.append(headerBtn);
                
                col_2 = $('<div />', { class: 'col-2' });
                closeBtn = $('<button />',{class: 'btn btn-light', type:'button'});
                closeBtn.attr('aria-label','Close');
                x = $('<span />', {class:'text-danger',text:'×'}).click(() => { removeOption(candidate._id) });
                x.attr('aria-hidden',true);
                closeBtn.append(x);
                col_2.append(closeBtn);
                
                cardHeader.append(col_1);
                cardHeader.append(col_2);
            
                cardCollapse = $('<div />', { class: 'collapse', id: `${id}-collapse-${index}` });
                cardCollapse.attr('aria-labelledby', `${id}-heading-${index}`);
                cardCollapse.attr('data-parent', `#accordion-${id}`);
                card.append(cardCollapse);

                cardBody = $('<div />', { class: 'card-body' });
                cardCollapse.append(cardBody);

                // 候選人

                //照片
                information = $('<div>',{class: 'container'});
                row = $('<div>', {class:'row'});
                col1 = $('<div>', {class:'col custom-file'});
                col2 = $('<div>', {class:'col'});
                if(candidate_info.avatar_url)
                    $('<img>',{src:`${candidate_info.avatar_url}`, class:"img-thumbnail rounded mx-auto d-block"}).appendTo(col1);
                else
                    $('<img>',{src:"https://picsum.photos/100", class:"img-thumbnail rounded mx-auto d-block"}).appendTo(col1);
                
                // 姓名
                Name = $('<label>', { text: '候選人：'});
                col2.append(Name);
                $('<input>', { value: candidate_info.name, id: `${candidate._id}-name`}).appendTo(Name);
                col2.append($('<br />'));
                // 系級
                dept = $('<label>', { text: '系級：' });
                col2.append(dept);
                $('<input>', { value: candidate_info.department, id: `${candidate._id}-department` }).appendTo(dept);
                col2.append($('<br />'));
                // 學院
                college = $('<label>', { text: '學院：' });
                col2.append(college);
                $('<input>', { value: candidate_info.college, id: `${candidate._id}-college` }).appendTo(college);

                // URL
                avatar = $('<label>', { text: '照片URL：' });
                $('<input>', { value: candidate_info.avatar_url, id: `${candidate._id}-avatar` }).appendTo(avatar);
                col2.append(avatar);
                
                row.append(col1); row.append(col2);
                information.append(row);
                cardBody.append(information);
                cardBody.append($('<br />'));

                // 經歷
                candidate_info.personal_experiences.forEach((exp, idx) => {
                    experiences = $('<div>', { class:'input-group'});
                    $('<span>', { text: '經歷'+(idx+1), class:"input-group-text"}).appendTo(experiences);
                    $('<textarea>', { text: exp, class:'form-control input-sm', id: `${candidate._id}-experience` }).appendTo(experiences);
                    cardBody.append(experiences);
                    cardBody.append($('<br />'));
                });
                
                // 政見
                candidate_info.political_opinions.forEach((opinion, idx) => {
                    experiences = $('<div>', { class:'input-group'});
                    $('<span>', { text: '政見'+(idx+1), class:"input-group-text bg-secondary text-white"}).appendTo(experiences);
                    $('<textarea>', { text: opinion, class:'form-control input-sm', id: `${candidate._id}-opinion` }).appendTo(experiences);
                    cardBody.append(experiences);
                    cardBody.append($('<br />'));
                });
                
                save_btn = $('<button />', { class: 'btn btn-sm btn-info', text: 'save' }).click(() => { updateOption(candidate._id) });
                cardBody.append(save_btn);
                cardBody.append($('<br />'));cardBody.append($('<br />'));

                // 副候選人1
                if(vice1_info){
                    // 照片
                    information = $('<div>',{class: 'container'});
                    row = $('<div>', {class:'row'});
                    col1 = $('<div>', {class:'col custom-file'});
                    col2 = $('<div>', {class:'col'});
                    if(candidate_info.avatar_url)
                        $('<img>',{src:`${vice1_info.avatar_url}`, class:"img-thumbnail rounded mx-auto d-block"}).appendTo(col1);
                    else
                        $('<img>',{src:"https://picsum.photos/200", class:"img-thumbnail rounded mx-auto d-block"}).appendTo(col1);
                    
                    // 姓名
                    Name = $('<label>', { text: '副候選人一：'});
                    col2.append(Name);
                    $('<input>', { value: vice1_info.name, id: `${candidate._id}-vice1name`}).appendTo(Name);
                    col2.append($('<br />'));
                    // 系級
                    dept = $('<label>', { text: '系級：' });
                    col2.append(dept);
                    $('<input>', { value: vice1_info.department, id: `${candidate._id}-vice1department` }).appendTo(dept);
                    col2.append($('<br />'));
                    // 學院
                    college = $('<label>', { text: '學院：' });
                    col2.append(college);
                    $('<input>', { value: vice1_info.college, id: `${candidate._id}-vice1college` }).appendTo(college);

                    // URL
                    avatar = $('<label>', { text: '照片URL：' });
                    $('<input>', { value: vice1_info.avatar_url, id: `${candidate._id}-vice1avatar` }).appendTo(avatar);
                    col2.append(avatar);
                
                    row.append(col1); row.append(col2);
                    information.append(row);
                    cardBody.append(information);
                    cardBody.append($('<br />'));
                    // 經歷
                    vice1_info.personal_experiences.forEach((exp, idx) => {
                        experiences = $('<div>', { class:'input-group'});
                        $('<span>', { text: '經歷'+(idx+1), class:"input-group-text"}).appendTo(experiences);
                        $('<textarea>', { text: exp, class:'form-control input-sm', id: `${candidate._id}-vice1experience` }).appendTo(experiences);
                        cardBody.append(experiences);
                        cardBody.append($('<br />'));
                    });
                    
                    save_btn = $('<button />', { class: 'btn btn-sm btn-info', text: 'save' }).click(() => {updateVice(candidate._id, 1)});
                    cardBody.append(save_btn);
                    cardBody.append($('<br />'));cardBody.append($('<br />'));
                }
                // 副候選人2
                if(vice2_info){
                    // 照片
                    information = $('<div>',{class: 'container'});
                    row = $('<div>', {class:'row'});
                    col1 = $('<div>', {class:'col custom-file'});
                    col2 = $('<div>', {class:'col'});
                    if(candidate_info.avatar_url)
                        $('<img>',{src:`${vice2_info.avatar_url}`, class:"img-thumbnail rounded mx-auto d-block"}).appendTo(col1);
                    else
                        $('<img>',{src:"https://picsum.photos/200", class:"img-thumbnail rounded mx-auto d-block"}).appendTo(col1);

                    Name = $('<label>', { text: '副候選人二：'});
                    col2.append(Name);
                    $('<input>', { value: vice2_info.name, id: `${candidate._id}-vice2name`}).appendTo(Name);
                    col2.append($('<br />'));
                    // 系級
                    dept = $('<label>', { text: '系級：' });
                    col2.append(dept);
                    $('<input>', { value: vice2_info.department, id: `${candidate._id}-vice2department` }).appendTo(dept);
                    col2.append($('<br />'));
                    // 學院
                    college = $('<label>', { text: '學院：' });
                    col2.append(college);
                    $('<input>', { value: vice2_info.college, id: `${candidate._id}-vice2college` }).appendTo(college);
                    col2.append($('<br />'));
                    
                    avatar = $('<label>', { text: '照片URL：' });
                    $('<input>', { value: vice2_info.avatar_url, id: `${candidate._id}-vice2avatar` }).appendTo(avatar);
                    col2.append(avatar);
                
                    row.append(col1); row.append(col2);
                    information.append(row);
                    cardBody.append(information);
                    cardBody.append($('<br />'));

                    // 經歷
                    vice2_info.personal_experiences.forEach((exp, idx) => {
                        experiences = $('<div>', { class:'input-group'});
                        $('<span>', { text: '經歷'+(idx+1), class:"input-group-text"}).appendTo(experiences);
                        $('<textarea>', { text: exp, class:'form-control input-sm', id: `${candidate._id}-vice2experience` }).appendTo(experiences);
                        cardBody.append(experiences);
                        cardBody.append($('<br />'));
                    });
                    
                    save_btn = $('<button />', { class: 'btn btn-sm btn-info', text: 'save' }).click(() => {updateVice(candidate._id, 2)});
                    cardBody.append(save_btn);
                }
            })
            
            // trigger modal
            $(`#modal-${id}`).modal();
        });
    } catch (error) {
        alert(errorReloadText);
    }
}

async function updateActivity(id) {
    try {
        _id = id;
        name = $(`#${id}-name`)[0].value;
        open_from = $(`#${id}-open-from`)[0].value;
        open_to = $(`#${id}-open-to`)[0].value;
        await axios.post('/activities/modifyActivity', { _id, name, open_from, open_to }).then((resp) => {
            if (resp.data.success) {
                $('#table').bootstrapTable('destroy');
                getActivity();
            }
        });
    } catch (error) {
        alert(errorReloadText);
    }
}

async function removeActivity(id) {
    try {
        
        _id = id;
        await axios.post('/activities/removeActivity', {_id}).then((resp) => {
            if (resp.data.success) {
                $('#table').bootstrapTable('destroy');
                getActivity();
            }
        });
    } catch (error) {
        alert(errorReloadText);
    }
}

function newActivity() {
    id = 'addActivity';

    if ($(`#modal-${id}`)[0] != undefined) {
        modal = $(`#modal-${id}`).remove();
    }

    // pre-config
    modal = $('#modal').clone();
    modal[0].id = `modal-${id}`;
    modal.find('#modalTitle')[0].id = `modalTitle-${id}`;
    modal.find(`#modalTitle-${id}`)[0].innerHTML = `新增活動`;
    modal.find('#modalBody')[0].innerHTML = "";
    modal.find('#modalBody')[0].id = `modalBody-${id}`;
    modal.insertAfter($('#modal'));

    // edit name
    $('<input />');
    name_input = $('<input />', { id: `${id}-name` });
    name_label = $('<label>').text('活動名稱: ');
    name_input.appendTo(name_label);
    modal.find(`#modalBody-${id}`).append(name_label);
    modal.find(`#modalBody-${id}`).append($('<br />'));

    // time format info
    info = $('<p>', { text: '時間格式範例：2020-06-04T04:00:00.000Z，需注意這是 GMT+0 時間，也就是台灣時間 2020/06/04 中午 12 點整，請自行換算。' });
    modal.find(`#modalBody-${id}`).append($('<br />'));
    modal.find(`#modalBody-${id}`).append(info);

    // edit time
    open_from_label = $('<label>').text('開放時間: ');
    $('<input />', { id: `${id}-open-from` }).appendTo(open_from_label);
    modal.find(`#modalBody-${id}`).append(open_from_label);
    modal.find(`#modalBody-${id}`).append($('<br />'));
    open_to_label = $('<label>').text('結束時間: ');
    $('<input />', { id: `${id}-open-to` }).appendTo(open_to_label);
    modal.find(`#modalBody-${id}`).append(open_to_label);
    modal.find(`#modalBody-${id}`).append($('<br />'));

    // save button
    save_btn = $('<button />', { class: 'btn btn-sm btn-info', text: 'save' }).click(() => { addActivity(id) });
    modal.find(`#modalBody-${id}`).append($(save_btn));

    // trigger modal
    $(`#modal-${id}`).modal();
}

async function updateOption(id) {
    try {
        if(confirm("確定更新候選人？")){
            _id = id;
            Name = $(`#${id}-name`)[0].value;
            department = $(`#${id}-department`)[0].value;
            college = $(`#${id}-college`)[0].value;
            url = $(`#${id}-avatar`)[0].value;

            var experience_input = $(`[id=${id}-experience]`);
            var personal_experiences = [];
            var i = 0;
            for(i=0; i < experience_input.length; i++){
                if(experience_input[i].value != ""){
                    personal_experiences.push(experience_input[i].value);
                }
            }

            var opinion_input = $(`[id=${id}-opinion]`);
            var political_opinions = [];
            i = 0;
            for(i=0; i < opinion_input.length; i++){
                if(opinion_input[i].value != ""){
                    political_opinions.push(opinion_input[i].value);
                }
            }
            
            await axios.post('/options/modifyOption', { _id, "candidate":{name:Name, department, college, personal_experiences, political_opinions, avatar_url:url}}).then((resp) => {
                if (resp.data.success) {
                console.log('update candidate');
                }
            });
        }else{
            return
        }
        
    } catch (error) {
        alert(errorReloadText);
    }
}

async function updateVice(id, viceNum) {
    try {
        if(confirm("確定更新候選人"+viceNum)){
            _id = id;
            Name = $(`#${id}-vice${viceNum}name`)[0].value;
            department = $(`#${id}-vice${viceNum}department`)[0].value;
            college = $(`#${id}-vice${viceNum}college`)[0].value;
            url = $(`#${id}-vice${viceNum}avatar`)[0].value;

            var experience_input = $(`[id=${id}-vice${viceNum}experience]`);
            var personal_experiences = [];
            var i = 0;
            for(i=0; i < experience_input.length; i++){
                if(experience_input[i].value != ""){
                    personal_experiences.push(experience_input[i].value);
                }
            }

            if(viceNum === 1){
                await axios.post('/options/modifyOption', { _id,"vice1":{name:Name, department, college, personal_experiences, avatar_url:url}}).then((resp) => {
                    if (resp.data.success) {
                    console.log('update vice1');
                    }
                });
            }

            if(viceNum === 2){
                await axios.post('/options/modifyOption', { _id,"vice2":{name:Name, department, college, personal_experiences, avatar_url:url}}).then((resp) => {
                    if (resp.data.success) {
                    console.log('update vice2');
                    }
                });
            }
        }else{
            return;
        }
        
        
    } catch (error) {
        alert(errorReloadText);
    }
}

async function removeOption(id) {
    try {
        _id = id;
        await axios.post('/options/removeOption', {_id}).then((resp) => {
            if (resp.data.success) {
                $(`#${id}-card`).remove();
            }
        });
    } catch (error) {
        alert(errorReloadText);
    }
}

function operateFormatter(value, row, index) {
    return [
        `<a class="edit" href="#" title="edit">`,
        '<i class="fas fa-edit"></i>',
        '</a>  ',
    ].join('');
}

window.operateEvents = {
    'click .edit': function(e, value, row, index) {
        editActivity(row._id);
    },
};

function removeFormatter(value, row, index) {
    return [
        '<a class="remove" style="color:#AAAAAA" href="javascript:void(0)" title="Remove">',
        '<i class="fa fa-trash"></i>',
        '</a>',
    ].join('');
}

window.removeEvents = {
    'click .remove': function(e, value, row, index) {
        removeActivity(row._id);
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
            alert(errorReloadText);
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
        html.push('<b>投票時間統計：</b>');
        const timeChartId = `chart-${makeId(10)}`;
        html.push(`<div class="col-md-11"><canvas id="${timeChartId}"></canvas></div>`);
        timeChartQueue.push({ time: result.vote_time, chartId: timeChartId });
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
        const vote_time = [];
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
            vote_time.push(moment(vote.created_at).startOf('hour').toDate());
        });
        return { statics, votes, vote_time };
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

function drawTimeChart() {
    for (let i = 0; i < timeChartQueue.length; i++) {
        const element = timeChartQueue[i];
        if (element.drawn == true) continue;
        const ctx = document.getElementById(element.chartId);
        if (ctx == undefined) continue;
        // process datetime
        const data = [];
        const sortedArray = element.time.sort((a, b) => a.getTime() - b.getTime());
        sortedArray.forEach(t => {
            let saved = false;
            for (i = 0; i < data.length; i++) {
                if (data[i].x.getTime() == t.getTime()) {
                    data[i].y += 1
                    saved = true;
                    break;
                }
            }
            if (!saved) {
                data.push({ x: t, y: 1 });
            }
        })
        const bgColor = ['#4d72bd', '#dd8143', '#a3a3a3', '#42f57e', '#ff0000']
        backgroundColor = () => {
            let tmp = [];
            for (i = 0; i < data.length; i++) {
                tmp.push(bgColor[i % bgColor.length]);
            }
            return tmp;
        }
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColor,
                }],
            },

            options: {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'hour',

                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                        }
                    }]
                },

            }
        });
        element['drawn'] = true;
    }
}