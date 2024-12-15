// In this updated data structure:
// - "question": string - the question text
// - "correctAnswers": array of strings - correct answers from the original data (first one is the primary correct answer for interview mode)
// - "wrongAnswers": array of strings - a set of 10 wrong answers. In interview mode, one correct answer and three random wrong answers will be displayed.

// For demonstration, we are using the same 10 generic wrong answers for each question.
// In practice, you should customize these wrong answers for each question to make them more realistic.

const genericWrongAnswers = [
    "the King’s Charter",
    "the Articles of Confederation",
    "the Declaration of Tiredness",
    "the Federal Codex",
    "the Colonial Laws",
    "the Parliamentary Rules",
    "State Ordinances",
    "the Book of Land Deeds",
    "Royal Edicts",
    "the Governor’s Mandate"
  ];
  
  const questions = [
    {
      question: "What is the supreme law of the land?",
      correctAnswers: ["the Constitution"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What does the Constitution do?",
      correctAnswers: [
        "sets up the government",
        "defines the government",
        "protects basic rights of Americans"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "The idea of self-government is in the first three words of the Constitution. What are these words?",
      correctAnswers: ["We the People"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is an amendment?",
      correctAnswers: [
        "a change (to the Constitution)",
        "an addition (to the Constitution)"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What do we call the first ten amendments to the Constitution?",
      correctAnswers: ["the Bill of Rights"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is one right or freedom from the First Amendment?*",
      correctAnswers: [
        "speech",
        "religion",
        "assembly",
        "press",
        "petition the government"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "How many amendments does the Constitution have?",
      correctAnswers: ["twenty-seven (27)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What did the Declaration of Independence do?",
      correctAnswers: [
        "announced our independence (from Great Britain)",
        "declared our independence (from Great Britain)",
        "said that the United States is free (from Great Britain)"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What are two rights in the Declaration of Independence?",
      correctAnswers: ["life", "liberty", "pursuit of happiness"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is freedom of religion?",
      correctAnswers: ["You can practice any religion, or not practice a religion."],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is the economic system in the United States?*",
      correctAnswers: ["capitalist economy", "market economy"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is the 'rule of law'?",
      correctAnswers: [
        "Everyone must follow the law.",
        "Leaders must obey the law.",
        "Government must obey the law.",
        "No one is above the law."
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name one branch or part of the government.*",
      correctAnswers: [
        "Congress",
        "legislative",
        "President",
        "executive",
        "the courts",
        "judicial"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What stops one branch of government from becoming too powerful?",
      correctAnswers: ["checks and balances", "separation of powers"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who is in charge of the executive branch?",
      correctAnswers: ["the President"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who makes federal laws?",
      correctAnswers: [
        "Congress",
        "Senate and House (of Representatives)",
        "(U.S. or national) legislature"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What are the two parts of the U.S. Congress?*",
      correctAnswers: ["the Senate and House (of Representatives)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "How many U.S. Senators are there?",
      correctAnswers: ["one hundred (100)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "We elect a U.S. Senator for how many years?",
      correctAnswers: ["six (6)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who is one of your state's U.S. Senators now?*",
      correctAnswers: [
        "Answers will vary. [District of Columbia residents and residents of U.S. territories should answer that D.C. (or the territory) has no U.S. Senators.]"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "The House of Representatives has how many voting members?",
      correctAnswers: ["four hundred thirty-five (435)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "We elect a U.S. Representative for how many years?",
      correctAnswers: ["two (2)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name your U.S. Representative.",
      correctAnswers: [
        "Answers will vary. [Residents of territories with nonvoting Delegates or Resident Commissioners may provide the name of that Delegate or Commissioner. Also acceptable is any statement that the territory has no (voting) Representatives in Congress.]"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who does a U.S. Senator represent?",
      correctAnswers: ["all people of the state"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Why do some states have more Representatives than other states?",
      correctAnswers: [
        "(because of) the state's population",
        "(because) they have more people",
        "(because) some states have more people"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "We elect a President for how many years?",
      correctAnswers: ["four (4)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "In what month do we vote for President?*",
      correctAnswers: ["November"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is the name of the President of the United States now?*",
      correctAnswers: [
        "Visit uscis.gov/citizenship/testupdates for the name of the President of the United States."
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is the name of the Vice President of the United States now?",
      correctAnswers: [
        "Visit uscis.gov/citizenship/testupdates for the name of the Vice President of the United States."
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "If the President can no longer serve, who becomes President?",
      correctAnswers: ["the Vice President"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "If both the President and the Vice President can no longer serve, who becomes President?",
      correctAnswers: ["the Speaker of the House"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who is the Commander in Chief of the military?",
      correctAnswers: ["the President"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who signs bills to become laws?",
      correctAnswers: ["the President"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who vetoes bills?",
      correctAnswers: ["the President"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What does the President’s Cabinet do?",
      correctAnswers: ["advises the President"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What are two Cabinet-level positions?",
      correctAnswers: [
        "Secretary of Agriculture",
        "Secretary of Commerce",
        "Secretary of Defense",
        "Secretary of Education",
        "Secretary of Energy",
        "Secretary of Health and Human Services",
        "Secretary of Homeland Security",
        "Secretary of Housing and Urban Development",
        "Secretary of the Interior",
        "Secretary of Labor",
        "Secretary of State",
        "Secretary of Transportation",
        "Secretary of the Treasury",
        "Secretary of Veterans Affairs",
        "Attorney General",
        "Vice President"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What does the judicial branch do?",
      correctAnswers: [
        "reviews laws",
        "explains laws",
        "resolves disputes (disagreements)",
        "decides if a law goes against the Constitution"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is the highest court in the United States?",
      correctAnswers: ["the Supreme Court"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "How many justices are on the Supreme Court?",
      correctAnswers: [
        "Visit uscis.gov/citizenship/testupdates for the number of justices on the Supreme Court."
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who is the Chief Justice of the United States now?",
      correctAnswers: [
        "Visit uscis.gov/citizenship/testupdates for the name of the Chief Justice of the United States."
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?",
      correctAnswers: [
        "to print money",
        "to declare war",
        "to create an army",
        "to make treaties"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Under our Constitution, some powers belong to the states. What is one power of the states?",
      correctAnswers: [
        "provide schooling and education",
        "provide protection (police)",
        "provide safety (fire departments)",
        "give a driver’s license",
        "approve zoning and land use"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who is the Governor of your state now?",
      correctAnswers: [
        "Answers will vary. [District of Columbia residents should answer that D.C. does not have a Governor.]"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is the capital of your state?*",
      correctAnswers: [
        "Answers will vary. [D.C. is not a state and does not have a capital. Residents of U.S. territories should name the capital of the territory.]"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What are the two major political parties in the United States?*",
      correctAnswers: ["Democratic and Republican"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is the political party of the President now?",
      correctAnswers: [
        "Visit uscis.gov/citizenship/testupdates for the political party of the President."
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is the name of the Speaker of the House of Representatives now?",
      correctAnswers: [
        "Visit uscis.gov/citizenship/testupdates for the name of the Speaker of the House of Representatives."
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "There are four amendments to the Constitution about who can vote. Describe one of them.",
      correctAnswers: [
        "Citizens eighteen (18) and older (can vote).",
        "You don’t have to pay (a poll tax) to vote.",
        "Any citizen can vote. (Women and men can vote.)",
        "A male citizen of any race (can vote)."
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is one responsibility that is only for United States citizens?*",
      correctAnswers: ["serve on a jury", "vote in a federal election"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name one right only for United States citizens.",
      correctAnswers: ["vote in a federal election", "run for federal office"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What are two rights of everyone living in the United States?",
      correctAnswers: [
        "freedom of expression",
        "freedom of speech",
        "freedom of assembly",
        "freedom to petition the government",
        "freedom of religion",
        "the right to bear arms"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What do we show loyalty to when we say the Pledge of Allegiance?",
      correctAnswers: ["the United States", "the flag"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is one promise you make when you become a United States citizen?",
      correctAnswers: [
        "give up loyalty to other countries",
        "defend the Constitution and laws of the United States",
        "obey the laws of the United States",
        "serve in the U.S. military (if needed)",
        "serve (do important work for) the nation (if needed)",
        "be loyal to the United States"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "How old do citizens have to be to vote for President?*",
      correctAnswers: ["eighteen (18) and older"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What are two ways that Americans can participate in their democracy?",
      correctAnswers: [
        "vote",
        "join a political party",
        "help with a campaign",
        "join a civic group",
        "join a community group",
        "give an elected official your opinion on an issue",
        "call Senators and Representatives",
        "publicly support or oppose an issue or policy",
        "run for office",
        "write to a newspaper"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "When is the last day you can send in federal income tax forms?*",
      correctAnswers: ["April 15"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "When must all men register for the Selective Service?",
      correctAnswers: ["at age eighteen (18)", "between eighteen (18) and twenty-six (26)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is one reason colonists came to America?",
      correctAnswers: [
        "freedom",
        "political liberty",
        "religious freedom",
        "economic opportunity",
        "practice their religion",
        "escape persecution"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who lived in America before the Europeans arrived?",
      correctAnswers: ["American Indians", "Native Americans"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What group of people was taken to America and sold as slaves?",
      correctAnswers: ["Africans", "people from Africa"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Why did the colonists fight the British?",
      correctAnswers: [
        "because of high taxes (taxation without representation)",
        "because the British army stayed in their houses (boarding, quartering)",
        "because they didn’t have self-government"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who wrote the Declaration of Independence?",
      correctAnswers: ["(Thomas) Jefferson"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "When was the Declaration of Independence adopted?",
      correctAnswers: ["July 4, 1776"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "There were 13 original states. Name three.",
      correctAnswers: [
        "New Hampshire",
        "Massachusetts",
        "Rhode Island",
        "Connecticut",
        "New York",
        "New Jersey",
        "Pennsylvania",
        "Delaware",
        "Maryland",
        "Virginia",
        "North Carolina",
        "South Carolina",
        "Georgia"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What happened at the Constitutional Convention?",
      correctAnswers: [
        "The Constitution was written.",
        "The Founding Fathers wrote the Constitution."
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "When was the Constitution written?",
      correctAnswers: ["1787"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.",
      correctAnswers: ["(James) Madison", "(Alexander) Hamilton", "(John) Jay", "Publius"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is one thing Benjamin Franklin is famous for?",
      correctAnswers: [
        "U.S. diplomat",
        "oldest member of the Constitutional Convention",
        "first Postmaster General of the United States",
        "writer of 'Poor Richard’s Almanac'",
        "started the first free libraries"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who is the 'Father of Our Country'?",
      correctAnswers: ["(George) Washington"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who was the first President?*",
      correctAnswers: ["(George) Washington"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What territory did the United States buy from France in 1803?",
      correctAnswers: ["the Louisiana Territory", "Louisiana"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name one war fought by the United States in the 1800s.",
      correctAnswers: ["War of 1812", "Mexican-American War", "Civil War", "Spanish-American War"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name the U.S. war between the North and the South.",
      correctAnswers: ["the Civil War", "the War between the States"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name one problem that led to the Civil War.",
      correctAnswers: ["slavery", "economic reasons", "states’ rights"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What was one important thing that Abraham Lincoln did?*",
      correctAnswers: [
        "freed the slaves (Emancipation Proclamation)",
        "saved (or preserved) the Union",
        "led the United States during the Civil War"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What did the Emancipation Proclamation do?",
      correctAnswers: [
        "freed the slaves",
        "freed slaves in the Confederacy",
        "freed slaves in the Confederate states",
        "freed slaves in most Southern states"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What did Susan B. Anthony do?",
      correctAnswers: ["fought for women’s rights", "fought for civil rights"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name one war fought by the United States in the 1900s.*",
      correctAnswers: [
        "World War I",
        "World War II",
        "Korean War",
        "Vietnam War",
        "(Persian) Gulf War"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who was President during World War I?",
      correctAnswers: ["(Woodrow) Wilson"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who was President during the Great Depression and World War II?",
      correctAnswers: ["(Franklin) Roosevelt"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Who did the United States fight in World War II?",
      correctAnswers: ["Japan, Germany, and Italy"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Before he was President, Eisenhower was a general. What war was he in?",
      correctAnswers: ["World War II"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "During the Cold War, what was the main concern of the United States?",
      correctAnswers: ["Communism"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What movement tried to end racial discrimination?",
      correctAnswers: ["civil rights (movement)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What did Martin Luther King, Jr. do?*",
      correctAnswers: ["fought for civil rights", "worked for equality for all Americans"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What major event happened on September 11, 2001, in the United States?",
      correctAnswers: ["Terrorists attacked the United States."],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name one American Indian tribe in the United States.",
      correctAnswers: [
        "Cherokee",
        "Navajo",
        "Sioux",
        "Chippewa",
        "Choctaw",
        "Pueblo",
        "Apache",
        "Iroquois",
        "Creek",
        "Blackfeet",
        "Seminole",
        "Cheyenne",
        "Arawak",
        "Shawnee",
        "Mohegan",
        "Huron",
        "Oneida",
        "Lakota",
        "Crow",
        "Teton",
        "Hopi",
        "Inuit"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name one of the two longest rivers in the United States.",
      correctAnswers: ["Missouri (River)", "Mississippi (River)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What ocean is on the West Coast of the United States?",
      correctAnswers: ["Pacific (Ocean)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What ocean is on the East Coast of the United States?",
      correctAnswers: ["Atlantic (Ocean)"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name one U.S. territory.",
      correctAnswers: [
        "Puerto Rico",
        "U.S. Virgin Islands",
        "American Samoa",
        "Northern Mariana Islands",
        "Guam"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name one state that borders Canada.",
      correctAnswers: [
        "Maine",
        "New Hampshire",
        "Vermont",
        "New York",
        "Pennsylvania",
        "Ohio",
        "Michigan",
        "Minnesota",
        "North Dakota",
        "Montana",
        "Idaho",
        "Washington",
        "Alaska"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name one state that borders Mexico.",
      correctAnswers: ["California", "Arizona", "New Mexico", "Texas"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is the capital of the United States?*",
      correctAnswers: ["Washington, D.C."],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Where is the Statue of Liberty?*",
      correctAnswers: [
        "New York (Harbor)",
        "Liberty Island",
        "[Also acceptable are New Jersey, near New York City, and on the Hudson (River).]"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Why does the flag have 13 stripes?",
      correctAnswers: [
        "because there were 13 original colonies",
        "because the stripes represent the original colonies"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Why does the flag have 50 stars?*",
      correctAnswers: [
        "because there is one star for each state",
        "because each star represents a state",
        "because there are 50 states"
      ],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "What is the name of the national anthem?",
      correctAnswers: ["The Star-Spangled Banner"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "When do we celebrate Independence Day?*",
      correctAnswers: ["July 4"],
      wrongAnswers: [...genericWrongAnswers]
    },
    {
      question: "Name two national U.S. holidays.",
      correctAnswers: [
        "New Year’s Day",
        "Martin Luther King, Jr. Day",
        "Presidents’ Day",
        "Memorial Day",
        "Independence Day",
        "Labor Day",
        "Columbus Day",
        "Veterans Day",
        "Thanksgiving",
        "Christmas"
      ],
      wrongAnswers: [...genericWrongAnswers]
    }
  ];
  
  