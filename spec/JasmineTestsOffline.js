/**
 * Jasmine Tests
 */

const EXPECTED_RESULT_COUNT = 11;
const USER_KEY = "n303osp9n70vv5tb";
const QUERY_STRING = "&zone=newspaper&q=mungbean";
const ZONE = 'newspaper';
const DEFAULT_WAIT_TIME = 5000;
const FIRST_VALUE = "122402063";
const HISTOGRAM_TEST_KEY = 24;
const HISTOGRAM_TEST_VALUE = 3;
const USER_ID = 1;
const USER_EM = 1;
const USER_STAT = 1;
const START_YEAR = 1800;
const YEAR_INCREMENT = 7;

beforeEach(function() {
	
	testing = true;
	m_user = {
			id: USER_ID,
			em: USER_EM, 
			stat: USER_STAT,
			key: USER_KEY
	};	    
	m_currentQuery = QUERY_STRING;
	m_currentZone = ZONE;
	
	init();
	m_resultSet = [{"zone":"newspaper","data":{"id":"122402063","url":"/newspaper/122402063","heading":"IN BRIEF AND receives maths funding","category":"Article","title":{"id":"11","value":"The Canberra Times (ACT : 1926 - 1995)"},"date":"1992-03-06","page":14,"pageSequence":14,"relevance":{"score":"0.048023656","value":"may have relevance"},"snippet":"... beans' BRISBANE: Nick-named \"mon grel beans\" by frustrated growers, the humble <strong>mungbean</strong> is sprouting ...","troveUrl":"http://trove.nla.gov.au/ndp/del/article/122402063?searchTerm=mungbean","text":null},"marker":null},{"zone":"newspaper","data":{"id":"110844175","url":"/newspaper/110844175","heading":"International attack on malnutrition Starvation report","category":"Article","title":{"id":"11","value":"The Canberra Times (ACT : 1926 - 1995)"},"date":"1977-05-04","page":25,"pageSequence":25,"relevance":{"score":"0.039545015","value":"may have relevance"},"snippet":"... six for its first move in the battle against malnutrition: soybean, <strong>mungbean,</strong> sweet potato, white ...  <strong>mungbean,</strong> with ong, slender pods, also is ligh in calorics, protein, 1 ninerals and vitamins, ndia is the ...","troveUrl":"http://trove.nla.gov.au/ndp/del/article/110844175?searchTerm=mungbean","text":null},"marker":null},{"zone":"newspaper","data":{"id":"122378746","url":"/newspaper/122378746","heading":"No excuse for not inviting Asian flavours into kitchen COOKING","category":"Article","title":{"id":"11","value":"The Canberra Times (ACT : 1926 - 1995)"},"date":"1991-08-20","page":20,"pageSequence":20,"relevance":{"score":"0.039459042","value":"may have relevance"},"snippet":"... rice mea sures to the Vh litre level in a measuring jug 1 large egg 85g <strong>mung-bean</strong> sprouts, washed ...","troveUrl":"http://trove.nla.gov.au/ndp/del/article/122378746?searchTerm=mungbean","text":null},"marker":null},{"zone":"newspaper","data":{"id":"116476427","url":"/newspaper/116476427","heading":"Spring-roll 'indicator' VIETNAM VILLAGE INN. Page Shopping Centre: 545410: lunch Tuesday-Friday 12-2pm, dinner Monday-Saturday 5-10.30pm, Sunday 5.30-10pm; BYO: Bankcard accepted.  FOOD FOR Thoughs","category":"Article","title":{"id":"11","value":"The Canberra Times (ACT : 1926 - 1995)"},"date":"1982-10-18","page":16,"pageSequence":16,"relevance":{"score":"0.03188772","value":"may have relevance"},"snippet":"... for the hot chilli. The only dessert we had was another success. <strong>Mung-bean</strong> sweet with coconut cream ...","troveUrl":"http://trove.nla.gov.au/ndp/del/article/116476427?searchTerm=mungbean","text":null},"marker":null},{"zone":"newspaper","data":{"id":"116384885","url":"/newspaper/116384885","heading":"Tips on healthy school lunches","category":"Article","title":{"id":"11","value":"The Canberra Times (ACT : 1926 - 1995)"},"date":"1984-01-17","page":13,"pageSequence":13,"relevance":{"score":"0.027901754","value":"may have relevance"},"snippet":"... together some alfalfa and <strong>mung-bean</strong> sprouts and place on buttered bread, top with grated carrot, grated ...","troveUrl":"http://trove.nla.gov.au/ndp/del/article/116384885?searchTerm=mungbean","text":null},"marker":null},{"zone":"newspaper","data":{"id":"118132146","url":"/newspaper/118132146","heading":"The bush tradition of hospitality lives on Prickel Farm","category":"Article","title":{"id":"11","value":"The Canberra Times (ACT : 1926 - 1995)"},"date":"1986-07-17","page":2,"pageSequence":2,"relevance":{"score":"0.027901754","value":"may have relevance"},"snippet":"... at work trying to piece together a solar powered, macrobiotic, <strong>mung-bean</strong> and mud-brick kit home. ...","troveUrl":"http://trove.nla.gov.au/ndp/del/article/118132146?searchTerm=mungbean","text":null},"marker":null},{"zone":"newspaper","data":{"id":"130554519","url":"/newspaper/130554519","heading":"Food&Wine Listing a healthy response DINING IN","category":"Article","title":{"id":"11","value":"The Canberra Times (ACT : 1926 - 1995)"},"date":"1995-05-31","page":34,"pageSequence":34,"status":"coming soon","relevance":{"score":"0.027901754","value":"may have relevance"},"snippet":"... ...","text":null},"marker":null},{"zone":"newspaper","data":{"id":"127235660","url":"/newspaper/127235660","heading":"MORE TO LIFE Australia's debt to Vietnamese culinary history  FINE DINING","category":"Article","title":{"id":"11","value":"The Canberra Times (ACT : 1926 - 1995)"},"date":"1993-06-29","page":14,"pageSequence":14,"status":"coming soon","relevance":{"score":"0.02391579","value":"may have relevance"},"snippet":"... Vietnam ese Australians. The crab-meat pate - a mix ture of seasoned crab-meat, minced pork <strong>mung-bean</strong> ...","text":null},"marker":null},{"zone":"newspaper","data":{"id":"110788220","url":"/newspaper/110788220","heading":"Advertising","category":"Advertising","title":{"id":"11","value":"The Canberra Times (ACT : 1926 - 1995)"},"date":"1974-11-16","page":15,"pageSequence":15,"relevance":{"score":"0.0029894738","value":"may have relevance"},"snippet":"... insect pests of grain, sorghum, maize, soybean, <strong>mungbean</strong> and other legume crops. The Clas6 2 ...","troveUrl":"http://trove.nla.gov.au/ndp/del/article/110788220?searchTerm=mungbean","text":null},"marker":null},{"zone":"newspaper","data":{"id":"125000679","url":"/newspaper/125000679","heading":"Advertising","category":"Advertising","title":{"id":"11","value":"The Canberra Times (ACT : 1926 - 1995)"},"date":"1984-04-02","page":28,"pageSequence":28,"relevance":{"score":"3.381273E-5","value":"vaguely relevant"},"snippet":"... <strong>MUNGBEANS</strong> Only $2.50 MESH M 1 SAVOURY PARTY MIX 4m $10.75 Zgjw I salad sprouts 8m rolls $19.95 JI| i I ...","troveUrl":"http://trove.nla.gov.au/ndp/del/article/125000679?searchTerm=mungbean","text":null},"marker":null},{"zone":"newspaper","data":{"id":"107894846","url":"/newspaper/107894846","heading":"Advertising","category":"Advertising","title":{"id":"11","value":"The Canberra Times (ACT : 1926 - 1995)"},"date":"1969-09-27","page":24,"pageSequence":24,"relevance":{"score":"7.245585E-6","value":"vaguely relevant"},"snippet":"... The crops under investigation include rice, maize, cotton, sorghum, <strong>mungbeans</strong> and peanuts. An ...","troveUrl":"http://trove.nla.gov.au/ndp/del/article/107894846?searchTerm=mungbean","text":null},"marker":null}];
	
	
	
	
	
	
});	

describe("Basic Search Test Suite", function() {	
	it("Tests that a basic search returns the correct number of results", function() {
		expect(m_resultSet.length).toEqual(EXPECTED_RESULT_COUNT);
	});
	
	it("Tests that the first result in the result set is correct", function() {
		expect(m_resultSet[0].data.id).toEqual(FIRST_VALUE);
	});
	
	it("Tests that histogram and cloud VALUES are correct", function() {
		_updateHistogram();
		
		expect(h_data[HISTOGRAM_TEST_KEY]).toEqual(HISTOGRAM_TEST_VALUE);
	});
	
	it("Tests that histogram and cloud LABELS are correct", function() {
		_updateHistogram();
		var start = START_YEAR;
		var end = START_YEAR + YEAR_INCREMENT;
				
		for (var i = 0; i < h_labels.length; i++) {
			expect(h_labels[i]).toEqual(start + " - " + end);
			start += YEAR_INCREMENT + 1;
			end += YEAR_INCREMENT + 1;
		};
	});
	
});
