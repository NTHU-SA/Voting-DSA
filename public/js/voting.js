document.cookie = 'service_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMTA3MDM0NTQ5IiwiaWF0IjoxNTg4MTUzMzE5LCJleHAiOjE1ODgyMzk3MTl9.h_sR1y_7Tnwvl94i4_ehLLljlTMif9_VKuyTF_S8lsM';


let voteOpt = null;
let imgDisappear = null;

let vote_answer1; let vote_answer2; let vote_answer3;
const candidate1PersonalExperiences = {
    '1': '清華AI樂團 擊樂組',
    '2': '「音樂演奏與實習」課程助教',
    '3': '清華愛樂-聖誕音樂會籌辦人',
    '4': '《繆斯的綺想》芭蕾 配樂團隊',
    '5': '中國北京 璃墟劇場 訪問工作人員',
    '6': '陸軍 302 旅 2 營 x 連 二等兵(兵籍資料保密)',
};
const candidate1PoliticalOpinions = {
    '1': '積極維護學生權益,包括成績申訴、選課爭議、轉系爭議等。',
    '2': '協助改善校內交通問題,包括校園巴士、校區區間車的班次、安全,汽 機車入校、外送機車入校、汽機車位規劃等問題。',
    '3': '與學生會持續共同關注有關學校建設、學生安全、學生權益的議題,透 明化運作與提升效率。',
    '4': '持續推動學生活動的舉行,延續現有活動、開辦新活動。',
    '5': '積極反應與協調系、學院內的問題,解決爭端,並協助系、學院師生維 持良好關係。',
    '6': '持續推動校園內性別友善、性別平等。',
    '7': '推動兩校區學生平等互助,開創合作雙贏的新局面。',
};

const candidate2PersonalExperiences = {
    '1': '清大 T-bike 校園單車計畫(107-1 ~)',
    '2': '載物產創-室友分配小組(107-1 ~)',
};
const candidate2PoliticalOpinions = {
    '1': '以「清大 T-bike 校園單車計畫」的經歷,提出三項政見:',
    '1.1': '協助改善「認領腳踏車」的方式,以及增加相關可用資源。',
    '1.2': '協助推動改善「校園廢棄腳踏車」的處理方式,發揮其潛在價值。',
    '1.3': '推廣「清大校園愛心單車」。',
    '2': '以「載物書院-室友分配小組」的經歷,提出三項政見:',
    '2.1': '針對「宿舍室友」問題,建立住宿生與校方之間有效的溝通管道。',
    '2.2': '維持上述溝通管道的運作順利。',
    '2.3': '推廣「清大校園愛心單車」。',
};

const candidate3PersonalExperiences = {
    '1': '國際交流社副社長、總務長',
    '2': '國際視訊團隊之國際模擬法庭辯論賽、模聯以 及下議院辯論',
    '3': '吉他社社員',
    '4': '秩序糾察',
};
const candidate3PoliticalOpinions = {
    '1': '校內 Youbike 收費調整:新竹內的共享單車收費方式即一經租借,開始計 費,若在校內完成租借與歸還的動作,意即不長占腳踏車的狀況下,還要 收費的話,我認為此舉將大大降低學生使用的意願。因此我認為,可以效 法中彰地區的前三十分鐘免費方案,免費時段可議。藉此,不但讓學生更 方便,也讓學生不會有虧錢之感。',
    '2': '自用腳踏車架維護:停腳踏車時,尖峰時刻,如中午時段,當腳踏車一 多,空位常剩下毀損的腳踏車架,造成使用者無法順利停入,於是任意擺 放,阻礙交通。我認為應和學校溝通與叮嚀,定期維護並更換毀損的車 架,以方便使用者停放。',
    '3': '學餐:就個人觀察,大家對學餐抱著嗤之以鼻之態,因此我認為應參考學 生意願,選擇最大公約數,讓攤販進入學校,如此一來,他們才有市場, 學生也吃得開心。',
};

function voteOneClick(Opt) {
    voteOpt = Opt;
    if (Opt == 1) {
        $('#member-one-vote-yes').css('max-width', '50%');
        $('#member-one-vote-yes').css('opacity', '100');
        $('#oneYescancelNot').css('display', 'none');
        $('#oneYescancel').css('display', 'block');
        $('#member-one-2').css('display', 'none');
        $('#member-one-3').css('display', 'none');
        vote_answer1 = {
            'name': '劉彥均',
            'department': '人文社會學院',
            'college': '中國文學學系 21 級',
            'avatar_url': 'dasjkh',
            'personal_experiences': candidate1PersonalExperiences,
            'political_opinions': candidate1PoliticalOpinions,
        };
    } else if (Opt == 2) {
        $('#member-one-vote-no').css('max-width', '50%');
        $('#member-one-vote-no').css('opacity', '100');
        $('#oneNocancelNot').css('display', 'none');
        $('#oneNocancel').css('display', 'block');
        $('#member-one-1').css('display', 'none');
        $('#member-one-3').css('display', 'none');
    } else if (Opt == 3) {
        $('#member-one-vote-withoutOpinion').css('max-width', '50%');
        $('#member-one-vote-withoutOpinion').css('opacity', '100');
        $('#oneWOcancelNot').css('display', 'none');
        $('#oneWOcancel').css('display', 'block');
        $('#member-one-1').css('display', 'none');
        $('#member-one-2').css('display', 'none');
    }
}

function imgOneClick(Opt) {
    imgDisappear = Opt;
    if (Opt == 1) {
        $('#member-one-vote-yes').css('max-width', '0%');
        $('#member-one-vote-yes').css('opacity', '0');
        $('#oneYescancelNot').css('display', 'block');
        $('#oneYescancel').css('display', 'none');
        $('#member-one-2').css('display', 'block');
        $('#member-one-3').css('display', 'block');
    } else if (Opt == 2) {
        $('#member-one-vote-no').css('max-width', '0%');
        $('#member-one-vote-no').css('opacity', '0');
        $('#oneNocancelNot').css('display', 'block');
        $('#oneNocancel').css('display', 'none');
        $('#member-one-1').css('display', 'block');
        $('#member-one-3').css('display', 'block');
    } else if (Opt == 3) {
        $('#member-one-vote-withoutOpinion').css('max-width', '0%');
        $('#member-one-vote-withoutOpinion').css('opacity', '0');
        $('#twoWOcancelNot').css('display', 'block');
        $('#oneWOcancel').css('display', 'none');
        $('#member-one-1').css('display', 'block');
        $('#member-one-2').css('display', 'block');
    }
}

function voteTwoClick(Opt) {
    voteOpt = Opt;
    if (Opt == 1) {
        $('#member-two-vote-yes').css('max-width', '50%');
        $('#member-two-vote-yes').css('opacity', '100');
        $('#twoYescancelNot').css('display', 'none');
        $('#twoYescancel').css('display', 'block');
        $('#member-two-2').css('display', 'none');
        $('#member-two-3').css('display', 'none');
        vote_answer2 = {
            'name': '陳皆錫',
            'department': '人文社會學院',
            'college': '人文社會學院學士班 22 級',
            'avatar_url': '',
            'personal_experiences': candidate2personalexperiences,
            'political_opinions': candidate2politicalopinions,
        };
    } else if (Opt == 2) {
        $('#member-two-vote-no').css('max-width', '50%');
        $('#member-two-vote-no').css('opacity', '100');
        $('#twoNocancelNot').css('display', 'none');
        $('#twoNocancel').css('display', 'block');
        $('#member-two-1').css('display', 'none');
        $('#member-two-3').css('display', 'none');
    } else if (Opt == 3) {
        $('#member-two-vote-withoutOpinion').css('max-width', '50%');
        $('#member-two-vote-withoutOpinion').css('opacity', '100');
        $('#twoWOcancelNot').css('display', 'none');
        $('#twoWOcancel').css('display', 'block');
        $('#member-two-1').css('display', 'none');
        $('#member-two-2').css('display', 'none');
    }
}

function imgTwoClick(Opt) {
    imgDisappear = Opt;
    if (Opt == 1) {
        $('#member-two-vote-yes').css('max-width', '0%');
        $('#member-two-vote-yes').css('opacity', '0');
        $('#twoYescancelNot').css('display', 'block');
        $('#twoYescancel').css('display', 'none');
        $('#member-two-2').css('display', 'block');
        $('#member-two-3').css('display', 'block');
    } else if (Opt == 2) {
        $('#member-two-vote-no').css('max-width', '0%');
        $('#member-two-vote-no').css('opacity', '0');
        $('#twoNocancelNot').css('display', 'block');
        $('#twoNocancel').css('display', 'none');
        $('#member-two-1').css('display', 'block');
        $('#member-two-3').css('display', 'block');
    } else if (Opt == 3) {
        $('#member-two-vote-withoutOpinion').css('max-width', '0%');
        $('#member-two-vote-withoutOpinion').css('opacity', '0');
        $('#twoWOcancelNot').css('display', 'block');
        $('#twoWOcancel').css('display', 'none');
        $('#member-two-1').css('display', 'block');
        $('#member-two-2').css('display', 'block');
    }
}

function voteThreeClick(Opt) {
    voteOpt = Opt;
    if (Opt == 1) {
        $('#member-three-vote-yes').css('max-width', '50%');
        $('#member-three-vote-yes').css('opacity', '100');
        $('#threeYescancelNot').css('display', 'none');
        $('#threeYescancel').css('display', 'block');
        $('#member-three-2').css('display', 'none');
        $('#member-three-3').css('display', 'none');
        vote_answer3 = {
            'name': '葉信宏',
            'department': '電機資訊學院',
            'college': '電機工程學系 23 級',
            'avatar_url': '',
            'personal_experiences': candidate3PersonalExperiences,
            'political_opinions': candidate3PoliticalOpinions,
        };
    } else if (Opt == 2) {
        $('#member-three-vote-no').css('max-width', '50%');
        $('#member-three-vote-no').css('opacity', '100');
        $('#threeNocancelNot').css('display', 'none');
        $('#threeNocancel').css('display', 'block');
        $('#member-three-1').css('display', 'none');
        $('#member-three-3').css('display', 'none');
    } else if (Opt == 3) {
        $('#member-three-vote-withoutOpinion').css('max-width', '50%');
        $('#member-three-vote-withoutOpinion').css('opacity', '100');
        $('#threeWOcancelNot').css('display', 'none');
        $('#threeWOcancel').css('display', 'block');
        $('#member-three-1').css('display', 'none');
        $('#member-three-2').css('display', 'none');
    }
}

function imgThreeClick(Opt) {
    imgDisappear = Opt;
    if (Opt == 1) {
        $('#member-three-vote-yes').css('max-width', '0%');
        $('#member-three-vote-yes').css('opacity', '0');
        $('#threeYescancelNot').css('display', 'block');
        $('#threeYescancel').css('display', 'none');
        $('#member-three-2').css('display', 'block');
        $('#member-three-3').css('display', 'block');
    } else if (Opt == 2) {
        $('#member-three-vote-no').css('max-width', '0%');
        $('#member-three-vote-no').css('opacity', '0');
        $('#threeNocancelNot').css('display', 'block');
        $('#threeNocancel').css('display', 'none');
        $('#member-three-1').css('display', 'block');
        $('#member-three-3').css('display', 'block');
    } else if (Opt == 3) {
        $('#member-three-vote-withoutOpinion').css('max-width', '0%');
        $('#member-three-vote-withoutOpinion').css('opacity', '0');
        $('#threeWOcancelNot').css('display', 'block');
        $('#threeWOcancel').css('display', 'none');
        $('#member-three-1').css('display', 'block');
        $('#member-three-2').css('display', 'block');
    }
}

async function sendUserResult() {
    console.log(document.cookie);
    try {
        // not sure if it is a need
        // await axios.post('/activities/addActivity', {
        //     'name': '第28屆學生議會議員補選',
        //     'type': 'candidate',
        //     'candidate': [
        //         vote_answer1, vote_answer2, vote_answer3,
        //     ],
        //     'rule': 'choose_all',
        // }, {});
        const resActivity = await axios.post('/activities/getActivities', {
            'filter': { name: '第28屆學生議會議員補選' },
            'limit': 0, 'skip': 0, 'sort': 0,
        }, {});
        activityID = resActivity.data.data[0]._id;
        const resOption = await axios.post('/options/getOptions', {
            'filter': {
                activity_id: activityID,
                type: 'candidate',
            },
            'limit': 0, 'skip': 0, 'sort': 0,
        }, {});
        optionID = resOption.data.data[0]._id;

        await axios.post('/votes/addVote', {
            'user_id': '',
            'activity_id': activityID,
            'rule': 'choose_one',
            'choose_one': optionID,
        }, {
            headers: {
                Authorization: `Bearer ${document.cookie.split('service_token=')[1]}`,
            },
        });
    } catch (e) {
        //TODO: add a catch func that tell users they've voted already
        console.log(e.response.data);
    }
}

async function getUserResult() {
    try {
        const res = await axios.post('/users/getUsers', {
            'filter': { student_id: '' },
            'limit': 0, 'skip': 0, 'sort': 0,
        }, {});
        const _user_id = res.data.data[0]._id;
        const _vote = await axios.post('/votes/getVote', { '_id': _user_id }, {});
    } catch (e) {
        console.log(e.response.data);
    }
};
