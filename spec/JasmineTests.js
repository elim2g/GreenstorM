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
	_doQuery(0);
	waits(DEFAULT_WAIT_TIME);
});	

describe("Basic Search Test Suite", function() {	
	it("Tests that a basic search returns the correct number of results", function() {
		expect(m_resultSet.length).toEqual(EXPECTED_RESULT_COUNT);
	});
	
	it("Tests that the first result in the result set is correct", function() {
		expect(m_resultSet[0].data.id).toEqual(FIRST_VALUE);
	});
	
	it("Tests that histogram data is correct", function() {
		expect(h_data[HISTOGRAM_TEST_KEY]).toEqual(HISTOGRAM_TEST_VALUE);
	});
});
