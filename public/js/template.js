function arrNoItemiztion(arr) {
  for (i = 0; i < arr.length; i++) arr[i] = arr[i].split('. ')[1];
  return arr;
}

const candidateTempl = [
  [{
    'member': 'member1',
    'cardTitle': '人社院1號候選人',
    'department': candidate1.department,
    'name': candidate1.name,
    'college': candidate1.college,
    'img': './img/candidate-1.png',
    'personalExperiences': arrNoItemiztion(candidate1.personal_experiences),
    'politicalOpinions': arrNoItemiztion(candidate1.political_opinions),
  }],
  [{
    'member': 'member2',
    'cardTitle': '人社院2號候選人',
    'department': candidate2.department,
    'name': candidate2.name,
    'college': candidate2.college,
    'img': './img/candidate-2.png',
    'politicalOpinions': arrNoItemiztion(candidate2.political_opinions),
    'personalExperiences': arrNoItemiztion(candidate2.personal_experiences),
  }],
  [{
    'member': 'member3',
    'cardTitle': '電資院1號候選人',
    'department': candidate3.department,
    'name': candidate3.name,
    'college': candidate3.college,
    'img': './img/candidate-3.png',
    'politicalOpinions': arrNoItemiztion(candidate3.political_opinions),
    'personalExperiences': arrNoItemiztion(candidate3.personal_experiences),
  }],
];

for (idx = 0; idx < candidateTempl.length; idx++) {
  imgIwantThis = 'https://i.imgur.com/ue4ktGb.png';
  members = candidateTempl[idx][0].member;
  cardTitles = candidateTempl[idx][0].cardTitle;
  imgs = candidateTempl[idx][0].img;
  names = candidateTempl[idx][0].name;
  departments = candidateTempl[idx][0].department;
  colleges = candidateTempl[idx][0].college;
  politicalOpinions = candidateTempl[idx][0].politicalOpinions;
  personalExperiences = candidateTempl[idx][0].personalExperiences;

  yesS = 'yes' + (idx + 1);
  yesUndoS = 'yesUndo' + (idx + 1);
  noS = 'no' + (idx + 1);
  noUndoS = 'noUndo' + (idx + 1);
  whateverS = 'whatever' + (idx + 1);
  whateverUndoS = 'whateverUndo' + (idx + 1);

  iWantYes = 'iWantYes' + (idx + 1);
  iWantNo = 'iWantNo' + (idx + 1);
  iWantWhatever = 'iWantWhatever' + (idx + 1);
  votebk1 = members + 'bk1';
  votebk2 = members + 'bk2';
  votebk3 = members + 'bk3';

  const candidatesMarkup = '<div class="container">' +
      '<div class="listBullteinBox">' +
      '<div class="card card-text-center">' +
      '<div class="card-header cardTitle">' +
      '${cardTitles}' +
      '</div>' +
      '<div class="card-body">' +
      '<div class="row memberInfo">' +
      '<div class="col-sm-4">' +
      '<div class="candidate-img">' +
      '<img src="${imgs}"/>' +
      '</div>' +
      '<div class="col voteBlock mb-4" id="${votebk1}">' +
      '<div class="col-md-10 voteTransperencissAnimate">' +
      '<img id="${iWantYes}" src="${imgIwantThis}" class="img-responsive" />' +
      '<h5 id="${yesS}" onclick="votesClick(1,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">我要投給他</h5>' +
      '<h5 class="voteUndo" id="${yesUndoS}" onclick="voteClickUndo(1,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">取消投給他 </h5>' +
      '</div>' +
      '</div>' +

      '<div class="col voteBlock mb-4" id="${votebk2}">' +
      '<div class="col-md-10 voteTransperencissAnimate">' +
      '<img id="${iWantNo}" src="${imgIwantThis}" class="img-responsive" />' +
      '<h5 id="${noS}" onclick="votesClick(2,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">我不投給他</h5>' +
      '<h5 class="voteUndo" id="${noUndoS}" onclick="voteClickUndo(2,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">取消不投給他 </h5>' +
      '</div>' +
      '</div>' +

      '<div class="col voteBlock mb-4" id="${votebk3}">' +
      '<div class="col-md-10 voteTransperencissAnimate">' +
      '<img id="${iWantWhatever}" src="${imgIwantThis}" class="img-responsive" />' +
      '<h5 id="${whateverS}" onclick="votesClick(3,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">我沒有意見</h5>' +
      '<h5 class="voteUndo" id="${whateverUndoS}" onclick="voteClickUndo(3,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">取消我沒意見 </h5>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<div class="col-sm-4">' +
      '<ul class="list-group candidateItems mb-4">' +
      '<li class="list-group-item active candidateItemsTitle">${names}</li>' +
      '<li class="list-group-item candidateItemsTitle">${departments}</li>' +
      '<li class="list-group-item candidateItemsTitle">${colleges}</li>' +
      '</ul>' +

      '<ul class="list-group candidateItems mb-4">' +
      '<li class="list-group-item active candidateItemsTitle">個人經歷</li>' +
      '{{each(i,exps) personalExperiences}}' +
      '<li class="list-group-item">' +
      '${exps}' +
      '</li>' +
      '{{/each}}' +
      '</ul>' +
      '</div>' +
      '<div class="col-sm-4">' +
      '<ul class="list-group candidateItems">' +
      '<li class="list-group-item active candidateItemsTitle">個人政見</li>' +

      '{{each(i,opis) politicalOpinions}}' +
      '<li class="list-group-item">' +
      '${opis}' +
      '</li>' +
      '{{/each}}' +

      '</ul>' +
      '</div>' +

      '</div>' +
      '</div>' +
      '<div class="card-footer text-muted"></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

  $.template('candidatesTemplate', candidatesMarkup);

  $.tmpl('candidatesTemplate', candidateTempl[idx]).appendTo('.' + members);
};
