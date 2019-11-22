var rules = [
  { flow: 'whatCanIDo',
    message: 'What can I help you with?',
    name: 'choice',
    type: 'SingleChoice',
    options: [
      {label: 'Explore stories',
        next: 'stories.storyTopic'},
      {label: 'Did you know?',
        postActions: [{'testAction': 'test'}],
        next: 'randomSlide.getSlide'},
      {label: 'Contact info',
        next: 'Contact.sendContact'},
      {label: 'Email us',
        next: 'Email.getEmailAddress'},
      {label: 'Sign up for newsletter',
        next: 'Newsletter.getEmail'}
      ]},
  { flow: 'stories',
    message: 'What do you want to read about?',
    name: 'storyTopic',
    type: 'SingleChoice',
    maxOptions: 4,
    options: [
      {label: 'Movies',
        value: '<a href="https://thestacker.com/stories/1587/100-best-movies-all-time">100 best movies of all time</a><br><a href="https://thestacker.com/stories/3309/111-monumental-movies-film-history-and-why-you-need-see-them">111 monumental movies from film history and why you need to see them</a><br><a href="https://thestacker.com/stories/3076/can-you-answer-these-real-jeopardy-questions-about-movies">Can you answer these real Jeopardy questions about movies?</a>'},
      {label: 'Music',
        value: '<a href="https://thestacker.com/stories/3310/song-summer-year-you-graduated-high-school">Song of the Summer the Year You Graduated High School</a><br><a href="https://thestacker.com/stories/3387/lyrics-50-famously-misunderstood-songs-explained">Lyrics to 50 Famously Misunderstood Songs, Explained</a><br><a href="https://thestacker.com/stories/2847/50-ways-music-has-changed-last-50-years">50 ways music has changed in the last 50 years</a>'},
      {label: 'College',
        value: '<a href="https://thestacker.com/stories/1495/best-value-colleges-every-state">Best Value Colleges in Every State</a><br><a href="https://thestacker.com/stories/2687/best-public-colleges-every-state">https://thestacker.com/stories/2687/best-public-colleges-every-state</a><br><a href="https://thestacker.com/stories/1175/college-majors-earn-least-money">50 College Majors That Earn the Least Money</a><br><a href="https://thestacker.com/stories/2684/best-private-colleges-every-state">Best private colleges in every state</a>'},
      {label: 'Retirement',
        value: '<a href="https://thestacker.com/stories/2314/best-place-retire-every-state">Best place to retire in every state</a><br><a href="https://thestacker.com/stories/1532/best-small-towns-retirees-america">Best small towns for retirees in America</a><br><a href="https://thestacker.com/stories/3402/15-ways-saving-retirement-has-changed-last-50-years">15 ways saving for retirement has changed in last 50 years</a>'},
      {label: 'Dogs',
        value: '<a href="https://thestacker.com/stories/2454/origins-50-most-popular-dog-breeds">Origins of The 50 Most Popular Dog Breeds</a><br><a href="https://thestacker.com/stories/482/best-house-friendly-dogs">Most Popular House-Friendly Dogs</a><br><a href="https://thestacker.com/stories/192/63-smartest-dog-breeds">Ranking the 63 Smartest Dog Breed</a>'},
      {label: 'Politics',
        value: '<a href="https://thestacker.com/stories/3043/can-you-answer-these-real-jeopardy-questions-about-politics">Can You Answer These Real Jeopardy Questions About Politics?</a><br><a href="https://thestacker.com/stories/3185/libertarian-gerrymandering-and-50-other-political-terms-you-should-know">Libertarian, Gerrymandering, and 50 Other Political Terms You Should Know</a><br><a href="https://thestacker.com/stories/2607/history-same-party-challengers">A history of same-party challengers</a>'}],
      replyMessage: 'Check out these featured stories!<br> {storyTopic}',
      next: 'whatCanIDo.choice'
  },
  { flow: 'Contact',
    message: '<a href="mailto:contact@thestacker.com">Email us at contact@thestacker.com</a>',
    name: 'sendContact',
    next: 'whatCanIDo.choice'
    // postActions: [{'email': '{help}'}]
  },
  { flow: 'Email',
    // message: '<a href="mailto:contact@thestacker.com">Email us at contact@thestacker.com</a>',
    message: 'Please enter your email address',
    type: 'String',
    validators: [{'email': true}],
    name: 'getEmailAddress',
    next: 'Email.getEmailBody'
    // postActions: [{'email': '{help}'}]
  },
  { flow: 'Email',
    // message: '<a href="mailto:contact@thestacker.com">Email us at contact@thestacker.com</a>',
    message: 'Enter your message and we will get back to you soon',
    type: 'String',
    name: 'getEmailBody',
    next: 'whatCanIDo.choice',
    postActions: [{'email': '{getEmailAddress}' + "|" + '{getEmailBody}'}]
    // postActions: [{'email': '{getEmailAddress}'}, {"email": '{getEmailBody}'}]
    // postActions: [{'email': {'address': '{getEmailAddress}', 'emailBody': '{getEmailBody}'}}]
  },
  { flow: 'Newsletter',
    message: 'Please enter your email',
    type: 'String',
    validators: [{'email': true}],
    name: 'getEmail',
    postActions: [{'newsletterSignup': '{getEmail}'}]
    // next: 'whatCanIDo.choice'
  },
  // { message: randomSlide1(), next: 'whatCanIDo.choice' },
  // { message: randomSlide(), next: 'Test.testing' },
  // { message: 'Enter your e-mail', name: 'email', type: 'String' },
  { flow: 'randomSlide', name: 'getSlide', sleep: 4000, delay: 0, postActions: [{'testAction': 'test'}], next: 'whatCanIDo.choice'},
  // { flow: 'end', name: 'backToStart', message: 'back to start', next:'whatCanIDo.choice'}
];

const bot = new YveBot(rules, {
  target: '.Chat',
  name: 'Chauncey',
  timestampable: false,
  timePerChar: 1
})
  .on('storeChanged', function(data) {
    // document.getElementById('output').innerText = JSON.stringify(data, null, 4);
  })
  .on('render', function() {
    document.querySelector('.yvebot-form-input').focus();
  })
  .start();

YveBot.actions.define('testAction', function (actionOptions, bot) {
    const { title, templateFile } = actionOptions;
    randomSlide1()
    return 'testFired'
  });

YveBot.actions.define('newsletterSignup', function (actionOptions, bot) {
    $.ajax({
        type: 'get',
        url: '/emailSignup/' + actionOptions,
        success: function (actionOptions) {
            console.log(actionOptions)
            botTalk(actionOptions, 'whatCanIDo.choice')
        }
    })
  });

function botTalk (textMessage, nextFlow) {
  bot.talk(textMessage, {next: nextFlow})
}

slides = [['Game of Thrones has 2nd most Emmy wins of all time', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/croppedMV5BMTM4NTAyODc2OV5BMl5BanBnXkFtZTcwODA4ODI2NQV1SY1000CR0015031000ALjpg.JPEG?itok=rnLF25T1">', '<p>- Wins: 47<br />- Nominations: 160</p><p>An adaptation of George R. R. Martin’s sprawling, unfinished series, “A Song of Ice and Fire,” HBO’s “Game of Thrones” places among the most beloved fantasy series in television history. </p>', '<a href=https://thestacker.com/stories/3443/most-emmy-wins-all-time>Read more: Most Emmy wins of all time</a>'],
  ['1978: Only 89 breweries still open in the US', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/edited6680938381271a863774kjpg.JPEG?itok=75BwXuEu">', '<p>- Price of a 16-ounce beer: $0.39<br/> - Inflation-adjusted price: $1.49 (#27 most expensive in last 68 years)<br/> - Number of U.S. breweries: 89</p><p>The deregulation that eventually allowed America’s small brewers to once again flourish begins in earnest as the <a href="https://www.homebrewersassociation.org/homebrewing-rights/statutes/">federal government decriminalizes homebrewing</a>. States could now decide for themselves whether to allow beer making at home.</p>', '<a href=https://thestacker.com/stories/872/cost-beer>Read more: The cost of a beer the year you turned 21</a>'],
  ['Larry Ellison, former CEO of Oracle, never finished college', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/cropped50158102310d94e90a01bjpg.JPEG?itok=H_gVnw0-">', '<p>From divorced college dropout to high-tech billionaire. <a href="https://www.google.com/url?q=http://www.latimes.com/local/lanow/la-me-ln-usc-ellison-20160513-snap-story.html&amp;sa=D&amp;ust=1515719196205000&amp;usg=AFQjCNG-RrERI18m2oziZd4v0Le8AdndPA">That’s the story</a> Larry Ellison shared with University of Southern California students in 2016. Although the tale of foregoing a college degree might seem an odd choice for a commencement address, Ellison has shown his commitment to higher education by giving $200 million to USC.</p>', '<a href=https://thestacker.com/stories/351/34-ceos-never-finished-college>Read more: 35 CEOs that never finished college</a>'],
  ['1984 : AT&T was broken up as a monopoly', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/2019-10/attmonoply.png?itok=GoxNtJ25">', '<p>From 1977 to 1899, <a href="https://www.latimes.com/archives/la-xpm-1995-09-21-fi-48462-story.html">the American telephone industry consisted solely</a> of the American Bell Telephone Company, which—using Alexander Graham Bell’s patents for the telephone—established the first exchanges and the telephone interchanges. Using a franchise model, local and regional exchanges were set up under the Bell model—collectively known as the Bell System. In 1899, American Telephone &amp; Telegraph (AT&amp;T) took over American Bell Telephone Company. In 1913, the federal government tried to break up AT&amp;T. It escaped the attempt on the promise that it would divest from Western Union and allow interconnection to its long-distance network. In 1949, the government tried again, this time limiting AT&amp;T to 85% of the national telephone network. Finally, the 1984 attempt broke AT&amp;T up into US West, Ameritech, NYNEX, BellSouth, and others, while AT&amp;T retained control of its long-distance business. AT&amp;T, Verizon (the result of the merging of NYNEX, GTE, and Bell Atlantic), and CenturyLink would collectively absorb most of the spun-off companies.</p>', '<a href=https://thestacker.com/stories/3604/15-companies-us-government-tried-break-monopolies>Read more: 15 companies the U.S. government tried to break up as monopolies</a>'],
  ['U.S. imports 82% of its figs from Turkey', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/croppedfig20791661280jpg.JPEG?itok=AK6gtKE8">', '<p>- U.S. total imports: $44.4 million<br/> - Top countries imported from:<br/> --- #1. Turkey ($35.6 million, 80.2% of U.S. imports)<br/> --- #2. Greece ($2.7 million, 6%)<br/> --- #3. Mexico ($2.1 million, 4.8%)<br/> --- #4. Spain ($1.9 million, 4.3%)<br/> --- #5. Peru ($0.7 million, 1.6%)</p><p>The vast majority of U.S. fig imports comes from the Middle Eastern country of Turkey. Despite difficult climate conditions in Turkey for fig production, demand has kept exports high. Fig production is also an important source of income for many in Turkey’s primary <a href="https://www.freshplaza.com/article/9042606/turkey-fig-exports-have-surpassed-million-usd/"> fig-growing regions of Aydin and Izmir</a>, where the crop is responsible for at least 45,000 jobs.</p>', '<a href=https://thestacker.com/stories/3574/where-america-gets-its-cocoa-and-20-other-agricultural-imports>Read more: Where America gets its cocoa and 20 other agricultural imports</a>'],
  ['1913: Federal Reserve Act is passed, ending the gold standard', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/croppeddollar13622439607200jpg.JPEG?itok=v3IyjUU_">', '<p>The Federal Reserve Act is one of the most influential laws in American history. This legislation—<a href="https://www.investopedia.com/terms/f/1913-federal-reserve-act.asp">signed by President Woodrow Wilson</a>—established the Federal Reserve System, which has the power to print money, adjust funds, and buy or sell bonds, notes, and bills. This has immense power over available interest rates and credits in the U.S., which is essential for the banking system.</p>', '<a href=https://thestacker.com/stories/2615/history-gold-and-which-countries-have-most>Read more: History of gold and which countries have the most</a>'],
  ['Servants (bellboys, butlers, cooks) were 5th most common job 100 years ago', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/Common_jobs_America_100_years_agoCommon_jobs_America_100_years_ago_slide_47.png?itok=GWIUhF79">', '<p>- Total employment in 1920: 1,270,946</p><p>Guests were sure to be swarmed and pampered by a variety of bell boys, butlers, and cooks upon stepping into a swanky hotel in 1920. Today, classified as baggage porters and bellhops, these workers only total at 42,350. While luxury travel remains a facet of the hospitality industry, the abundance of options at cheaper option hotels negates the need for so many servants at every lodging locale.</p>', '<a href=https://thestacker.com/stories/3494/most-common-jobs-america-100-years-ago>Read more: Most common jobs in America 100 years ago</a>'],
  ['1830: The steam locomotive is invented', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/Tomthumbpetercoopersironhorse6092027jpg.JPEG?itok=s8e07gzy">', '<p>Decades before trains revolutionized how people traveled, they changed the way materials and products were moved from port to factory, factory to warehouse, warehouse to distributor facility, and beyond. It all started in 1830 with the creation of <a href="https://americanhistory.si.edu/collections/search/object/nmah_843782">Tom Thumb</a>, America’s first steam locomotive. Tom Thumb was built specifically to convince the owners of the newly formed Baltimore and Ohio (B&amp;O) Railroad to use steam-powered engines instead of horses to pull cars on their rails.</p>', '<a href=https://thestacker.com/stories/3470/history-manufacturing-america>Read more: History of manufacturing in America</a>'],
  ['Harvard is wealthier than Paraguay', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/00003906.png?itok=2og-gLQ2">', '<p>- Location: Boston, MA<br/> - 2018 endowment: $38.3 billion (up 6.3% from 2017)<br/> - More wealth than: 109 countries<br/> - Wealth equal to: Paraguay ($37.9B) and Kiribati ($0.3B) with $21 million leftover</p>', '<a href=https://thestacker.com/stories/848/colleges-richer-countries>Read more: Colleges that are richer than some countries</a>'],
  ['Pennsylvania is the 3rd most likely state to hit a deer driving', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/pennsylvania_deer.png?itok=NNNcD2rS">', '<p>- 2018 chances of hitting a deer: 1 In 63 (1.59% of drivers)<br/> - 2017 chances of hitting a deer: 1 In 63 (1.59% of drivers)<br/> - One-year percent change: 0.2% decrease</p>', '<a href=https://thestacker.com/stories/349/states-where-you-are-most-likely-hit-deer>Read more: States where you are most likely to hit a deer</a>'],
  ['McDonalds was founded in 1940', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/Iconic_companies_slide_12.png?itok=vCX_HYoL">', "<p>McDonald's is the quintessential American fast-food chain. McDonald's was founded in 1940 by Richard and Maurice McDonald in San Bernardino, Calif. Although Ray Kroc later <a href='https://corporate.mcdonalds.com/corpmcd/about-us/history.html'>bought the company in 1955</a> and transformed it into the mass franchise chain we know it as today. McDonald's is the largest restaurant chain in the world earning<a href='https://www.macrotrends.net/stocks/charts/MCD/mcdonalds/revenue'> $22 billion in revenue</a> in 2018. McDonald's impact on American culture can be seen from its promotions with movies and the Olympics to charities it hosts such as the <a href='https://www.rmhc.org/'>Ronald McDonald House Charities</a>.</p>", '<a href=https://thestacker.com/stories/3293/iconic-american-companies-started-year-you-were-born>Read more: Iconic American companies started the year you were born</a>'],
  ['Refined petroleum is the largest export in U.S.', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/00002659_0.png?itok=Qn0m3qOD">', "<p>The United States is a major oil importer. It is also a major exporter. With the development of shale oil extraction, the country's position as a major energy producer was strengthened. A large part of the nation's oil infrastructure is petroleum refinement, including petroleum extraction.</p>", '<a href=https://thestacker.com/stories/3237/global-trade-numbers>Read more: Global trade by the numbers</a>'],
  ['Nursing is the 4th most popular major in the U.S.', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/2019-06-09_2204.png?itok=JmZIhE0w">', "<p>- Major category: health<br/> - Total graduates: 1,769,892<br/> - Unemployment rate: 2.7%<br/> - Median income: $62,000</p><p>Nursing majors learn how to help treat those who are ill or injured and promote healthy practices in patients. Most graduates go on to pursue nursing jobs at a hospital, doctor's office, or school. Registered nurse positions are expected to increase by 15% between 2016 and 2026.</p>", '<a href=https://thestacker.com/stories/3179/most-popular-college-majors-america>Read more: Most popular college majors in America</a>'],
  ['U.S. exports more medical equipment to the Netherlands than any other country', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/00000468_1.png?itok=OcMzOht8">', '<p>- Total U.S. exports: $37.2 billion<br/> - Top export destinations:<br/> --- #1. Netherlands ($4.1 billion, 11.0%)<br/> --- #2. Japan ($3.7 billion, 10.0%)<br/> --- #3. China ($3.7 billion, 10.0%)<br/> --- #4. Canada ($3.1 billion, 8.2%)<br/> --- #5. Mexico ($3.0 billion, 8.1%)</p><p>Medical equipment is a major driver of both American trade and American foreign policy. The largest companies in the industry—Medtronic, Johnson &amp; Johnson, GE Healthcare, Siemens, Abbott Laboratories, Cardinal Health, and Boston Scientific—are all American companies. The international growth in the industry reflects an increased awareness in wellness among more affluent nations.</p>', '<a href=https://thestacker.com/stories/2893/where-america-sends-its-cars-corn-and-30-other-goods#13>Read more: Where America sends its cars, corn, and 30 other goods</a>'],
  ['Grapes are the most valuable agriculture product in California', '<img width="100%" src="https://thestacker.com/sites/default/files/styles/properly_sized_image/public/California_agriculture_%252815362705902%2529.jpg?itok=w1ScCu_W">', '<p>Total value of agricultural products sold: $42.6 billion (#1 among all states)<br/> Top agricultural commodities sold: Fruit, tree nuts, and berries ($17.6 billion), Milk from cows ($6.9 billion), Vegetables, melons, potatoes and sweet potatoes ($6.3 billion)<br/> Most valuable crops produced: Grapes ($5.8 billion), Almonds ($5.6 billion), Strawberries ($3.1 billion)</p>', '<a href=https://thestacker.com/stories/2379/most-valuable-agricultural-products-every-state>Read more: Most valuable agricultural products from every state</a>'],
]

function randomSlide1 () {
  slideIndex = Math.floor(Math.random() * slides.length);
  bot.talk(slides[slideIndex][0], {delay: 200})
  bot.talk(slides[slideIndex][1], {delay: 500})
  bot.talk(slides[slideIndex][2], {delay: 1500})
  bot.talk(slides[slideIndex][3], {delay: 1800})
  slides.splice(slideIndex, 1)
}

YveBot.actions.define('email', function (actionOptions, bot) {
    console.log(actionOptions)
    $.ajax({
        type: 'post',
        url: '/sendMail',
        data: actionOptions,
        success: function (actionOptions) {
            console.log(actionOptions)
            botTalk(actionOptions, 'whatCanIDo.choice')
        }
    })
    return 'testFired'
  });
