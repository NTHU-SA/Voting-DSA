const candidateTempl = [
  [{
    'member': 'member1',
    'cardTitle': '人社院1號候選人',
    'department': candidate1.department,
    'name': candidate1.name,
    'college': candidate1.college,
    'img': './img/candidate-1.png',
  }],
  [{
    'member': 'member2',
    'cardTitle': '人社院2號候選人',
    'department': candidate2.department,
    'name': candidate2.name,
    'college': candidate2.college,
    'img': './img/candidate-2.png',
  }],
];


for (idx = 0; idx < candidateTempl.length; idx++) {
  imgIwantThis = 'https://i.imgur.com/ue4ktGb.png';
  members = candidateTempl[idx][0].member;
  cardTitles = candidateTempl[idx][0].cardTitle;
  imgs = candidateTempl[idx][0].img;

  yesS = 'yes' + (idx + 1);
  yesUndoS = 'yesUndo' + (idx + 1);
  noS = 'no' + (idx + 1);
  noUndoS = 'noUndo' + (idx + 1);
  whateverS = 'whatever' + (idx + 1);
  whateverUndoS = 'whateverUndo' + (idx + 1);

  let cardTitleMarkup = '<div class="container">' +
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
      '<div class="col voteBlock mb-4">' +

      '<div class="col-md-10 voteTransperencissAnimate">' +
      '<img id="iWantThis1" src="${imgIwantThis}" class="img-responsive" />' +
      '<h5 id="${yesS}" onclick="votesClick(1)">我要投給他</h5>' +
      '<h5 id="${yesUndoS}" onclick="votesClick(1)">取消投給他 </h5>' +
      '</div>' +
      '</div>' +

      '<div class="col voteBlock mb-4">' +
      '<div class="col-md-10 voteTransperencissAnimate">' +
      '<h5 id="${noS}" onclick="votesClick(2)">我不投給他</h5>' +
      '<h5 id="${noUndoS}" onclick="votesClick(2)">取消不投給他 </h5>' +
      '</div>' +
      '</div>' +

      '<div class="col voteBlock mb-4">' +
      '<div class="col-md-10 voteTransperencissAnimate">' +
      '<h5 id="${whateverS}" onclick="votesClick(3)">我沒有意見</h5>' +
      '<h5 id="${whateverUndoS}" onclick="votesClick(3)">取消我沒意見</h5>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<div class="col-sm-4">' +
      '</div>' +

      '</div>' +
      '</div>' +
      '<div class="card-footer text-muted"></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

  // Compile the markup as a named template
  $.template('cardTitleTemplate', cardTitleMarkup);

  $.tmpl('cardTitleTemplate', candidateTempl[idx]).appendTo('.' + members);
}


// const markup = '<li>Some content: ${$item.myMethod()}.<br/>' +
//     'More content: ${$item.myValue}.</li>';

// $.tmpl('cardTitleTemplate', candidateTempl).appendTo('.member1');

// $.tmpl('cardTitleTemplate', {
//   yesClick: () => {
//     votesClick(1, $('#iWantThis').attr('id'))
//   }
// });

// console.log($('#iWantThis').attr('id'));
