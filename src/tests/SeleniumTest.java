package tests;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.sun.xml.internal.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;
import com.thoughtworks.selenium.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class SeleniumTest {
    private Selenium selenium;
    public static final int START_YEAR = 1800;
    public static final int END_YEAR = 2000;
    
    
    @Before
    public void setUp() throws Exception {
        selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://localhost:8080/PaperMiner/");
        selenium.start();
    }
          
    @Test
    public void Login() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        selenium.click("link=Query");
        Thread.sleep(1000);
        selenium.click("link=New");
    }
    
    @Test
    public void Logout() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        selenium.click("link=Logout");
        Thread.sleep(3000);
        selenium.click("link=Login or Register");
    }
    
    @Test
    public void MenusOpen() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        selenium.open("/PaperMiner");
        selenium.click("link=Home");
        Thread.sleep(1000);
        selenium.click("link=Map");
        Thread.sleep(1000);
        selenium.click("link=Graphs");
        Thread.sleep(1000);
        selenium.click("link=Term Cloud");
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        Thread.sleep(1000);
        selenium.click("link=About");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@type='button'])[4]");
        Thread.sleep(300);
        selenium.click("link=Trove");
        Thread.sleep(1000);
        selenium.click("link=Paper Miner");
        Thread.sleep(1000);
        selenium.click("link=Read Release Notes");
        Thread.sleep(1000);
        selenium.click("link=Home");
    }
    
    @Test
    public void Histograms() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        selenium.click("link=New");
        selenium.type("id=q1", "celestials");
        selenium.click("id=nq-pb12");
        Thread.sleep(7000);
        selenium.click("id=btn-pause");
        selenium.click("link=Graphs");        
    }
    
    @Test
    public void SaveQuerySimpleSearch() throws Exception {
        LoginFunc();
        Thread.sleep(500);
        simpleSearch("Celestials");
        Thread.sleep(500);
        startSearchAndPauseAfter(20);
        Thread.sleep(500);
        selenium.click("id=cc-pb12");
        Thread.sleep(500);
        assertTrue(selenium.isElementPresent("id=qd1"));
        Thread.sleep(1000);
        assertTrue(selenium.getValue("id=qd1").contains("Celestials"));
        deleteSavedQuery("all");
        Thread.sleep(1000);
        selenium.keyPressNative("10"); // Press Enter to remove popup
        Thread.sleep(1000);
        selenium.type("qd1", "TestSave");
        Thread.sleep(1000);
        selenium.click("id=sq-pb15");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("Query saved"));
        Thread.sleep(1000);
        assertTrue(selenium.getText("id=type0").contains("Simple"));
        Thread.sleep(1000);
        assertTrue(selenium.getText("id=zone0").contains("newspaper"));
    }
    
    @Test
    public void SaveQueryAdvancedSearchBook() throws Exception {
        LoginFunc();
        Thread.sleep(500);
        advancedSearchBook("Celestials");
        Thread.sleep(500);
        startSearchAndPauseAfter(20);
        Thread.sleep(500);
        selenium.click("id=cc-pb12");
        Thread.sleep(500);
        assertTrue(selenium.isElementPresent("id=qd1"));
        Thread.sleep(1000);
        deleteSavedQuery("all");
        Thread.sleep(1000);
        selenium.keyPressNative("10"); // Press Enter to remove popup
        Thread.sleep(1000);
        selenium.type("qd1", "TestSave");
        Thread.sleep(1000);
        selenium.click("id=sq-pb15");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("Query saved"));
        Thread.sleep(1000);
        assertTrue(selenium.getText("id=type0").contains("Advanced"));
        Thread.sleep(1000);
        assertTrue(selenium.getText("id=zone0").contains("book"));
    }
    
    @Test
    public void TestRecentSearchSimple() throws Exception {
        LoginFunc();
        Thread.sleep(500);
        simpleSearch("Celestials");
        Thread.sleep(500);
        startSearchAndPauseAfter(20);
        Thread.sleep(500);
        selenium.click("link=Recent");
        Thread.sleep(500);
        assertTrue(selenium.isTextPresent("Celestials"));
        assertTrue(selenium.isTextPresent("Simple"));
        assertTrue(selenium.isTextPresent("newspaper"));
    }
    
    @Test
    public void TestRecentSearchSimpleMultiple() throws Exception {
        LoginFunc();
        Thread.sleep(500);
        simpleSearch("Celestials");
        Thread.sleep(500);
        startSearchAndPauseAfter(20);
        Thread.sleep(500);
        selenium.click("link=Recent");
        Thread.sleep(500);
        assertTrue(selenium.isTextPresent("Celestials"));
        assertTrue(selenium.isTextPresent("Simple"));
        assertTrue(selenium.isTextPresent("newspaper"));
        Thread.sleep(500);
        simpleSearch("Test");
        Thread.sleep(500);
        startSearchAndPauseAfter(20);
        Thread.sleep(500);
        selenium.click("link=Recent");
        Thread.sleep(500);
        assertTrue(selenium.isTextPresent("Test"));
        assertTrue(selenium.isTextPresent("Simple"));
    }
    
    @Test
    public void TestRecentSearchAdvanced() throws Exception {
        LoginFunc();
        Thread.sleep(500);
        advancedSearchBook("Celestials");
        Thread.sleep(500);
        startSearchAndPauseAfter(20);
        Thread.sleep(500);
        selenium.click("link=Recent");
        Thread.sleep(500);
        assertTrue(selenium.isTextPresent("Celestials"));
        assertTrue(selenium.isTextPresent("Advanced"));
        assertTrue(selenium.isTextPresent("book"));
    }
    
    @Test
    public void TestRecentSearchCustomSingle() throws Exception {
        LoginFunc();
        Thread.sleep(500);
        customSearch("book", "Celestials");
        Thread.sleep(500);
        startSearchAndPauseAfter(20);
        Thread.sleep(500);
        selenium.click("link=Recent");
        Thread.sleep(500);
        assertTrue(selenium.isTextPresent("Celestials"));
        assertTrue(selenium.isTextPresent("Custom"));
        assertTrue(selenium.isTextPresent("book"));
    }
    
    @Test
    public void TestRecentSearchCustomMultiple() throws Exception {
        ArrayList<String> zones = new ArrayList();
        zones.add("book");
        zones.add("newspaper");
        
        LoginFunc();
        Thread.sleep(500);
        customSearch(zones, "Celestials");
        Thread.sleep(500);
        startSearchAndPauseAfter(20);
        Thread.sleep(500);
        selenium.click("link=Recent");
        Thread.sleep(500);
        assertTrue(selenium.isTextPresent("Celestials"));
        assertTrue(selenium.isTextPresent("Custom"));
        for (int j = 0; j < zones.size(); j++) {
            assertTrue(selenium.isTextPresent(zones.get(j)));
        }
    }
    
    @Test
    public void DeleteSavedQuery() throws Exception {
        LoginFunc();
        Thread.sleep(500);
        simpleSearch("Celestials");
        Thread.sleep(500);
        startSearchAndPauseAfter(20);
        Thread.sleep(500);
        selenium.click("id=cc-pb12");
        Thread.sleep(500);
        assertTrue(selenium.isElementPresent("id=qd1"));
        Thread.sleep(1000);
        assertTrue(selenium.getValue("id=qd1").contains("Celestials"));
        selenium.type("qd1", "TestSave");
        Thread.sleep(1000);
        selenium.click("id=sq-pb15");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("Query saved"));
        Thread.sleep(1000);
        selenium.click("link=Home");
        Thread.sleep(3000);
        selenium.click("link=Saved");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("Stored Queries"));
        Thread.sleep(1000);
        deleteSavedQuery(0);
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("Queries deleted Ok"));        
    }
        
    @Test
    public void SortByDate() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=Home");
        
        Thread.sleep(2000);
        selenium.click("link=Query");
        Thread.sleep(1000);
        selenium.click("link=New");
        selenium.click("id=adv-query");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "celestials");
        Thread.sleep(1000);
        selenium.click("id=adv-newspaper");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(4000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1880-11-27"));
        assertFalse(selenium.isTextPresent("1880-11-26"));
        assertTrue(selenium.isTextPresent("1887-09-17"));
        assertFalse(selenium.isTextPresent("1887-09-15"));
    }
    
    @Test
    public void SortByRelevance() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=Home");
        
        Thread.sleep(2000);
        selenium.click("link=Query");
        Thread.sleep(1000);
        selenium.click("link=New");
        selenium.click("id=adv-query");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "celestials");
        Thread.sleep(1000);
        selenium.click("id=adv-newspaper");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(4000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[2]");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("13."));
        assertFalse(selenium.isTextPresent("0."));
    }
    
    @Test
    public void SortBySource() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=Home");
        
        Thread.sleep(2000);
        selenium.click("link=Query");
        Thread.sleep(1000);
        selenium.click("link=New");
        selenium.click("id=adv-query");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "celestials");
        Thread.sleep(1000);
        selenium.click("id=adv-newspaper");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(4000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[3]");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("000009"));
        assertFalse(selenium.isTextPresent("000010"));
    }
    
    @Test
    public void SortByRetrieveOrder() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=Home");
        
        Thread.sleep(2000);
        selenium.click("link=Query");
        Thread.sleep(1000);
        selenium.click("link=New");
        selenium.click("id=adv-query");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "celestials");
        Thread.sleep(1000);
        selenium.click("id=adv-newspaper");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(4000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[4]");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1897-04-15"));
        assertFalse(selenium.isTextPresent("1904-06-11"));
    }
    
    @Test
    public void AdvancedSearchNewspapers() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchNewspaper("Celestials");
        startSearchAndPauseAfter(20);        
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1897-04-15"));
    }
    
    @Test
    public void AdvancedSearchBooks() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchBook("Celestials");
        startSearchAndPauseAfter(20);        
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("2004-2009"));
    }
    
    @Test
    public void AdvancedSearchPictures() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchPicture("Celestials");
        startSearchAndPauseAfter(20);        
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1855"));
    }
    
    @Test
    public void AdvancedSearchArticle() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchArticle("Celestials");
        startSearchAndPauseAfter(20);        
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("2010"));
    }
    
    @Test
    public void AdvancedSearchMusic() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchMusic("Celestials");
        startSearchAndPauseAfter(20);        
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("19"));
    }
    
    @Test
    public void AdvancedSearchMaps() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchMap("Celestials");
        startSearchAndPauseAfter(50);        
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("0.13069183"));
    }
    
    @Test
    public void AdvancedSearchLists() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchList("Celestials");
        startSearchAndPauseAfter(20); 
        Thread.sleep(2000);
        selenium.click("id=cc-pb14");
        Thread.sleep(2000);
        assertTrue(selenium.isTextPresent("0.000420895"));
        
    }   
    
    @Test
    public void YearCloudWithResults() throws Exception {
        LoginFunc();
        Thread.sleep(500);
        selenium.click("link=New");
        Thread.sleep(500);
        selenium.type("id=q1", "celestials");
        selenium.click("id=nq-pb12");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
        Thread.sleep(500);
        selenium.click("link=Term Cloud");
        Thread.sleep(500);
        assertTrue(selenium.isVisible("id=year-cloud"));
    }
    
    @Test
    public void YearCloudNoResults() throws Exception {
        LoginFunc();
        Thread.sleep(500);
        selenium.click("link=New");
        Thread.sleep(500);
        selenium.click("link=Term Cloud");
        Thread.sleep(1500);
        assertFalse(selenium.isVisible("id=year-cloud"));
    }
    
    @Test
    public void testViewResultsButton() throws Exception {
        LoginFunc();
        Thread.sleep(600);
        
        selenium.click("link=New");
        Thread.sleep(600);
        selenium.type("id=q1", "Mungbean");
        Thread.sleep(600);
        selenium.click("id=nq-pb12");
        Thread.sleep(3000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1500);
        assertTrue(selenium.isTextPresent("Raw Data View"));
    }
    
    @Test
    public void testExportPic() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchPicture("Celestials");
        startSearchAndPauseAfter(20); 
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("id=export-csv");
        Thread.sleep(1000);
        selenium.click("css=body > a");
    }
    
    @Test
    public void testExportNewspaper() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchNewspaper("Celestials");
        startSearchAndPauseAfter(20); 
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("id=export-csv");
        Thread.sleep(1000);
        selenium.click("css=body > a");
    }
    
    @Test
    public void testExportArticle() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchArticle("Celestials");
        startSearchAndPauseAfter(20); 
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("id=export-csv");
        Thread.sleep(1000);
        selenium.click("css=body > a");
    }
    
    @Test
    public void testExportBook() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchBook("Celestials");
        startSearchAndPauseAfter(20); 
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("id=export-csv");
        Thread.sleep(1000);
        selenium.click("css=body > a");
    }
    
    @Test
    public void testExportCollection() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchCollection("Celestials");
        startSearchAndPauseAfter(20); 
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("id=export-csv");
        Thread.sleep(1000);
        selenium.click("css=body > a");
    }
    
    @Test
    public void testExportList() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchList("Celestials");
        startSearchAndPauseAfter(20); 
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("id=export-csv");
        Thread.sleep(1000);
        selenium.click("css=body > a");
    }
    
    @Test
    public void testExportMap() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchMap("Celestials");
        startSearchAndPauseAfter(20); 
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("id=export-csv");
        Thread.sleep(1000);
        selenium.click("css=body > a");
    }
    
    @Test
    public void testExportMusic() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        advancedSearchMusic("Celestials");
        startSearchAndPauseAfter(20); 
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("id=export-csv");
        Thread.sleep(1000);
        selenium.click("css=body > a");
    }
    
    @Test
    public void testYearCloudClickOutsideBoundarySimpleQuery() throws Exception {
        final int lowBoundary = 1903;
        final int highBoundary = 1912;
        ArrayList<String> years = new ArrayList();
        years = addYearsToList(years, START_YEAR, lowBoundary);
        years = addYearsToList(years, highBoundary, END_YEAR); 
        
        LoginFunc();
        Thread.sleep(1000);        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.type("id=q1", "celestials");
        Thread.sleep(1000);
        startSearchAndPause();
        Thread.sleep(1000);
        selenium.click("link=Term Cloud");
        Thread.sleep(1000);
        Thread.sleep(1000);
        selenium.click("id=year-cloud_word_0");
        Thread.sleep(1000);       
        assertTrue(selenium.isVisible("id=raw-list-container"));
        for (String year : years) { 
            assertFalse(selenium.isTextPresent(year));
        }
        Thread.sleep(1000);
    }
    
    @Test
    public void testYearCloudClickInsideBoundarySimpleQuery() throws Exception {
        final int lowBoundary = 1904;
        final int highBoundary = 1911;
        boolean oneYearExists = false;
        ArrayList<String> years = new ArrayList();
        years = addYearsToList(years, lowBoundary, highBoundary);      
        
        LoginFunc();
        Thread.sleep(2000);        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.type("id=q1", "celestials");
        Thread.sleep(1000);
        startSearchAndPause();
        Thread.sleep(1000);
        selenium.click("link=Term Cloud");
        Thread.sleep(1000);
        Thread.sleep(1000);
        selenium.click("id=year-cloud_word_0");
        Thread.sleep(1000);       
        assertTrue(selenium.isVisible("id=raw-list-container"));
        for (String year : years) { 
            if (selenium.isTextPresent(year)) {
                oneYearExists = true;
                break;
            }            
        }
        assertTrue(oneYearExists);
        Thread.sleep(1000);
    }
    
    @Test
    public void testYearCloudClickOutsideBoundaryAdvancedQueryArticle() throws Exception {
        final int lowBoundary = 1983;
        final int highBoundary = 1992;
        ArrayList<String> years = new ArrayList();
        years = addYearsToList(years, START_YEAR, lowBoundary);
        years = addYearsToList(years, highBoundary, END_YEAR); 
        
        LoginFunc();
        Thread.sleep(2000);        
        advancedSearchArticle("Celestials");
        Thread.sleep(1000);
        startSearchAndPause();
        Thread.sleep(1000);
        selenium.click("link=Term Cloud");
        Thread.sleep(1000);
        Thread.sleep(1000);
        selenium.click("id=year-cloud_word_0");
        Thread.sleep(1000);       
        assertTrue(selenium.isVisible("id=raw-list-container"));
        for (String year : years) { 
            assertFalse(selenium.isTextPresent(year));
        }
        Thread.sleep(1000);
    }
    
    @Test
    public void testYearCloudClickInsideBoundaryAdvancedQueryArtcile() throws Exception {
        final int lowBoundary = 1984;
        final int highBoundary = 1991;
        boolean oneYearExists = false;
        ArrayList<String> years = new ArrayList();
        years = addYearsToList(years, lowBoundary, highBoundary);      
        
        LoginFunc();
        Thread.sleep(2000);        
        advancedSearchArticle("Celestials");
        Thread.sleep(1000);
        startSearchAndPause();
        Thread.sleep(1000);
        selenium.click("link=Term Cloud");
        Thread.sleep(1000);
        selenium.click("id=year-cloud_word_0");
        Thread.sleep(1000);       
        assertTrue(selenium.isVisible("id=raw-list-container"));
        for (String year : years) { 
            if (selenium.isTextPresent(year)) {
                oneYearExists = true;
                break;
            }            
        }
        assertTrue(oneYearExists);
        Thread.sleep(1000);
    }
    
    @Test
    public void testYearCloudClickOutsideBoundaryAdvancedQueryBook() throws Exception {
        final int lowBoundary = 1968;
        final int highBoundary = 1975;
        ArrayList<String> years = new ArrayList();
        years = addYearsToList(years, START_YEAR, lowBoundary);
        years = addYearsToList(years, highBoundary, END_YEAR); 
        
        LoginFunc();
        Thread.sleep(2000);        
        advancedSearchBook("Celestials");
        Thread.sleep(1000);
        startSearchAndPauseAfter(50);
        Thread.sleep(1000);
        selenium.click("link=Term Cloud");
        Thread.sleep(2000);
        selenium.click("id=year-cloud_word_0");
        Thread.sleep(1000);       
        assertTrue(selenium.isVisible("id=raw-list-container"));
        for (String year : years) { 
            assertFalse(selenium.isTextPresent(year));
        }
    }
    
    @Test
    public void testYearCloudClickInsideBoundaryAdvancedQueryBook() throws Exception {
        final int lowBoundary = 1968;
        final int highBoundary = 1975;
        boolean oneYearExists = false;
        ArrayList<String> years = new ArrayList();
        years = addYearsToList(years, lowBoundary, highBoundary);      
        
        LoginFunc();
        Thread.sleep(2000);        
        advancedSearchBook("Celestials");
        Thread.sleep(1000);
        startSearchAndPause();
        Thread.sleep(1000);
        selenium.click("link=Term Cloud");
        Thread.sleep(1000);
        Thread.sleep(1000);
        selenium.click("id=year-cloud_word_0");
        Thread.sleep(1000);       
        assertTrue(selenium.isVisible("id=raw-list-container"));
        for (String year : years) { 
            if (selenium.isTextPresent(year)) {
                oneYearExists = true;
                break;
            }            
        }
        assertTrue(oneYearExists);
        Thread.sleep(1000);
    }
    
    @Test
    public void testYearCloudClickOutsideBoundaryAdvancedQueryCollection() throws Exception {
        final int lowBoundary = 1943;
        final int highBoundary = 1952;
        ArrayList<String> years = new ArrayList();
        years = addYearsToList(years, START_YEAR, lowBoundary);
        years = addYearsToList(years, highBoundary, END_YEAR); 
        
        LoginFunc();
        Thread.sleep(2000);        
        advancedSearchCollection("Celestials");
        Thread.sleep(1000);
        startSearchAndPause();
        Thread.sleep(1000);
        selenium.click("link=Term Cloud");
        Thread.sleep(1000);
        Thread.sleep(1000);
        selenium.click("id=year-cloud_word_0");
        Thread.sleep(1000);       
        assertTrue(selenium.isVisible("id=raw-list-container"));
        for (String year : years) { 
            assertFalse(selenium.isTextPresent(year));
        }
        Thread.sleep(1000);
    }
    
    @Test
    public void testYearCloudClickInsideBoundaryAdvancedQueryCollection() throws Exception {
        final int lowBoundary = 1944;
        final int highBoundary = 1951;
        boolean oneYearExists = false;
        ArrayList<String> years = new ArrayList();
        years = addYearsToList(years, lowBoundary, highBoundary);      
        
        LoginFunc();
        Thread.sleep(2000);        
        advancedSearchCollection("Celestials");
        Thread.sleep(1000);
        startSearchAndPause();
        Thread.sleep(1000);
        selenium.click("link=Term Cloud");
        Thread.sleep(1000);
        Thread.sleep(1000);
        selenium.click("id=year-cloud_word_0");
        Thread.sleep(1000);       
        assertTrue(selenium.isVisible("id=raw-list-container"));
        for (String year : years) { 
            if (selenium.isTextPresent(year)) {
                oneYearExists = true;
                break;
            }            
        }
        assertTrue(oneYearExists);
        Thread.sleep(1000);
    }
    
    
    
    @Test
    public void testStartSearchAndPauseAfter() throws Exception {      
        
        LoginFunc();
        final int testNumber = 120;
        Thread.sleep(1000);
        simpleSearch("Celestials");
        startSearchAndPauseAfter(testNumber);

        String text = selenium.getText("id=progress");
        String split[] = text.split(" / ");
        int count = Integer.parseInt(split[0]);
        
        assertTrue(count >= testNumber);
    }
    
    @Test
    public void testAdvancedPicDecade() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-picture");
        Thread.sleep(1500);
        selenium.select("id=adv-picture-decade", "label=1840's");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1845-1924"));
        assertTrue(selenium.isTextPresent("1841-1900"));
    }
    
    @Test
    public void testAdvancedPicPubYear() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-picture");
        Thread.sleep(1000);
        selenium.select("id=adv-picture-year", "label=1841");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1840-1860"));
        assertTrue(selenium.isTextPresent("1841-1900"));
    }
    
    
    @Test
    public void testAdvancedPicLanguage() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-picture");
        Thread.sleep(1000);
        selenium.type("id=adv-picture-language", "Japanese");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1885"));
        assertTrue(selenium.isTextPresent("1890"));
    }
    
    @Test
    public void testAdvancedPicAustralian() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-picture");
        Thread.sleep(1000);
        selenium.click("id=adv-picture-australian");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1923"));
        assertTrue(selenium.isTextPresent("1941"));
    }
    

    @Test
    public void testAdvNewsDecade() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-newspaper");
        Thread.sleep(1000);
        selenium.select("id=adv-newspaper-decade", "label=1970's");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(5000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1970"));
    }
    
    
    @Test
    public void testAdvNewsYear() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-newspaper");
        Thread.sleep(1000);
        selenium.select("id=adv-newspaper-year", "label=1814");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1814-01-22"));
        assertTrue(selenium.isTextPresent("1814-05-21"));
    }
    
    
    @Test
    public void testAdvNewsPublication() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-newspaper");
        Thread.sleep(2000);
        selenium.select("id=adv-newspaper-publication", "label=The Canberra Times (ACT : 1926 - 1995)");
        Thread.sleep(2000);
        selenium.click("css=#adv-newspaper-publication > option[value=\"11\"]");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(5000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[3]");
        Thread.sleep(500);
        assertTrue(selenium.isTextPresent("000011"));
    }
    
    
    @Test
    public void testAdvNewsCategory() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-newspaper");
        Thread.sleep(1000);
        selenium.select("id=adv-newspaper-category", "label=Advertising");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(5500);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        selenium.click("link=1893-02-25");
        assertTrue(selenium.isTextPresent("Advertising"));
    }
    
    
    @Test
    public void testAdvMusicDecade() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-music");
        Thread.sleep(1000);
        selenium.select("id=adv-music-decade", "label=1980's");
        Thread.sleep(1500);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(1500);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1980"));
        assertTrue(selenium.isTextPresent("1985"));
        selenium.click("link=1983-1995");
        Thread.sleep(500);
        assertTrue(selenium.isTextPresent("music"));
    }
    
    
    @Test
    public void testAdvMusicYear() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-music");
        Thread.sleep(1000);
        selenium.select("id=adv-music-year", "label=2012");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("2012"));
    }
    
    
    @Test
    public void testAdvMusicLanguage() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "lotus");
        Thread.sleep(1000);
        selenium.click("id=adv-music");
        Thread.sleep(1000);
        selenium.type("id=adv-music-language", "Japanese");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1996"));
        selenium.click("css=a.raw-data-selector.info");
        Thread.sleep(500);
        assertTrue(selenium.isTextPresent("Greetings from Japan"));
    }

    
    @Test
    public void testAdvMusicAustralian() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-music");
        Thread.sleep(1000);
        selenium.click("id=adv-music-australian");
        Thread.sleep(1000);
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("2001"));
        selenium.click("//a[contains(text(),'2001')]");
        Thread.sleep(500);
        assertTrue(selenium.isTextPresent("ScreenSound Australia"));
    }
    
    @Test
    public void testAdvMapDecade() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-map");
        Thread.sleep(1000);
        selenium.select("id=adv-map-decade", "label=1900's");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("0.1"));
    }
    
    
    @Test
    public void testAdvMapYear() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-map");
        Thread.sleep(1000);
        selenium.select("id=adv-map-decade", "label=1900's");
        Thread.sleep(1000);
        selenium.click("css=#adv-map-decade > option[value=\"190\"]");
        Thread.sleep(1000);
        selenium.select("id=adv-map-year", "label=1901");
        Thread.sleep(1000);                                                                                                                                                                                                                                                                                                                                                                                                                         
        selenium.click("css=#adv-map-year > option[value=\"1901\"]");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("0.1"));
    }
    
    
    @Test
    public void testAdvMapLanguage() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-map");
        Thread.sleep(1000);
        selenium.type("id=adv-map-language", "Chinese");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("link=0.16871272");
        Thread.sleep(500);
        assertTrue(selenium.isTextPresent("Shanghai"));
    }
    
    
    @Test
    public void testAdvMapAustralian() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-map");
        Thread.sleep(1000);
        selenium.click("id=adv-map-australian");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        selenium.click("link=1.0648098");
        assertTrue(selenium.isTextPresent("Brisbane floods"));
    }
    
    
    @Test
    public void testAdvListDecade() throws Exception {
        LoginFunc();
        Thread.sleep(2000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-list");
        Thread.sleep(1000);
        selenium.click("id=adv-list-decade");
        Thread.sleep(600);
        selenium.select("id=adv-list-decade", "label=1800's");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        
        assertTrue(getTotalRecs() == 0);
    }
    
    @Test
    public void testAdvListPubYear() throws Exception {
        LoginFunc();
        Thread.sleep(2000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-list");
        Thread.sleep(1000);
        selenium.select("id=adv-list-decade", "label=1900's");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        
        assertTrue(selenium.isTextPresent("undefined"));
    }
    
    @Test
    public void testAdvCollectionDecade() throws Exception {
        LoginFunc();
        Thread.sleep(2000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-collection");
        Thread.sleep(1000);
        selenium.select("id=adv-list-decade", "label=1900\'s");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(3000);
        selenium.click("id=btn-pause");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        
        assertTrue(selenium.isTextPresent("1900"));
        assertFalse(selenium.isTextPresent("1911"));
    }
       
    @Test
    public void testAdvCollectionPubYear() throws Exception {
        LoginFunc();
        Thread.sleep(2000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-collection");
        Thread.sleep(1000);
        selenium.select("id=adv-collection-year", "label=--1900--");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(3000);
        selenium.click("id=btn-pause");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        
        assertTrue(selenium.isTextPresent("1900"));
        assertFalse(selenium.isTextPresent("1901"));
    }
    
    @Test
    public void testAdvCollectionAustralian() throws Exception {
        LoginFunc();
        Thread.sleep(2000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-collection");
        Thread.sleep(1000);
        selenium.click("id=adv-collection-australian");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(3000);
        selenium.click("id=btn-pause");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        selenium.click("//a[contains(text(),'2011')]");
        assertTrue(selenium.isTextPresent("Queensland"));
    }
    
    @Test
    public void testAdvBookDecade() throws Exception {
        LoginFunc();
        Thread.sleep(2000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-book");
        Thread.sleep(1000);
        selenium.select("id=adv-book-decade", "label=1900\'s");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(3000);
        selenium.click("id=btn-pause");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        
        assertTrue(selenium.isTextPresent("1900"));
        assertFalse(selenium.isTextPresent("1911"));
    }
       
    @Test
    public void testAdvBookPubYear() throws Exception {
        LoginFunc();
        Thread.sleep(2000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-book");
        Thread.sleep(1000);
        selenium.select("id=adv-book-year", "label=--1900--");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(3000);
        selenium.click("id=btn-pause");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        
        assertTrue(selenium.isTextPresent("1900"));
        assertFalse(selenium.isTextPresent("1901"));
    }
    
    @Test
    public void testAdvBookAustralian() throws Exception {
        LoginFunc();
        Thread.sleep(2000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", "floods");
        Thread.sleep(1000);
        selenium.click("id=adv-book");
        Thread.sleep(1000);
        selenium.click("id=adv-book-australian");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(3000);
        selenium.click("id=btn-pause");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        selenium.click("//a[contains(text(),'1957')]");
        assertTrue(selenium.isTextPresent("Australia"));
    }
        
    @Test
    public void TestPaginateResultsLessThan100() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        simpleSearch("Celestials");
        Thread.sleep(1000);
        startSearchAndPauseAfter(8);
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        assertFalse(selenium.isElementPresent("id=page-options"));
    }
    
    @Test
    public void TestPaginateResultsMoreThan100() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        simpleSearch("Celestials");
        Thread.sleep(1000);
        startSearchAndPauseAfter(101);
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        assertTrue(selenium.isElementPresent("id=page-options"));
    }
    
    private void LoginFunc() throws Exception {
        selenium.open("/PaperMiner");
        Thread.sleep(2000);
        selenium.click("link=User");
        Thread.sleep(300);
        selenium.click("link=Login or Register");
        Thread.sleep(500);
        selenium.type("em", "dev@paperminer.com");
        selenium.click("xpath=(//button[@type='button'])[6]");
    }
    
    @Test
    public void CustomSearchNewspapers() throws Exception {
        ArrayList<String> zones = new ArrayList();
        zones.add("newspaper");
        
        LoginFunc();
        Thread.sleep(1000);
        customSearch(zones, "Celestials");
        Thread.sleep(1000);
        startSearchAndPauseAfter(20);        
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("1897-04-15"));
    }
    
    @Test
    public void CustomSearchArticleAddingParametersChangeResults() throws Exception {
        int totalResultsNoParameters = 0;
        int totalResultsWithParameters = 0;
        HashMap<String, String> parameters = new HashMap<String, String>();
        parameters.put("select:id=custom-facet-audience-search", "label=Trade");
        parameters.put("textbox:id=custom-index-identifier-search", "ISBN");
        
        LoginFunc();
        Thread.sleep(1000);
        customSearch("article", "Celestials");
        Thread.sleep(1000);
        startSearchAndPauseAfter(20);
        Thread.sleep(1000);
        totalResultsNoParameters = getTotalRecs();
        Thread.sleep(1000);
        customSearch("article", "Celestials", parameters);
        Thread.sleep(1000);
        startSearchAndPauseAfter(20);
        Thread.sleep(1000);
        totalResultsWithParameters = getTotalRecs();
        Thread.sleep(1000);
        assertFalse(totalResultsNoParameters == totalResultsWithParameters);
    }
    
    @Test
    public void CustomSearchNewspaperAddingParametersChangeResults() throws Exception {
        int totalResultsNoParameters = 0;
        int totalResultsWithParameters = 0;
        HashMap<String, String> parameters = new HashMap<String, String>();
        parameters.put("select:id=custom-facet-category-search", "Article");
        
        LoginFunc();
        Thread.sleep(1000);
        customSearch("newspaper", "Celestials");
        Thread.sleep(1000);
        startSearchAndPauseAfter(20);
        Thread.sleep(1000);
        totalResultsNoParameters = getTotalRecs();
        Thread.sleep(1000);
        customSearch("newspaper", "Celestials", parameters);
        Thread.sleep(1000);
        startSearchAndPauseAfter(20);
        Thread.sleep(1000);
        totalResultsWithParameters = getTotalRecs();
        Thread.sleep(1000);
        assertFalse(totalResultsNoParameters == totalResultsWithParameters);
    }
    
    @Test
    public void CustomSearchBookAddingParametersChangeResults() throws Exception {
        int totalResultsNoParameters = 0;
        int totalResultsWithParameters = 0;
        HashMap<String, String> parameters = new HashMap<String, String>();
        parameters.put("checkbox:id=custom-facet-australian-search", "");
        
        LoginFunc();
        Thread.sleep(1000);
        customSearch("book", "Celestials");
        Thread.sleep(1000);
        startSearchAndPauseAfter(20);
        Thread.sleep(1000);
        totalResultsNoParameters = getTotalRecs();
        Thread.sleep(1000);
        customSearch("book", "Celestials", parameters);
        Thread.sleep(1000);
        startSearchAndPauseAfter(20);
        Thread.sleep(1000);
        totalResultsWithParameters = getTotalRecs();
        Thread.sleep(1000);
        assertFalse(totalResultsNoParameters == totalResultsWithParameters);
    }
    
    @Test
    public void CustomSearchMusicAddingParametersChangeResults() throws Exception {
        int totalResultsNoParameters = 0;
        int totalResultsWithParameters = 0;
        HashMap<String, String> parameters = new HashMap<String, String>();
        parameters.put("checkbox:id=custom-facet-australian-search", "");
        
        LoginFunc();
        Thread.sleep(1000);
        customSearch("music", "Celestials");
        Thread.sleep(1000);
        startSearchAndPauseAfter(20);
        Thread.sleep(1000);
        totalResultsNoParameters = getTotalRecs();
        Thread.sleep(1000);
        customSearch("music", "Celestials", parameters);
        Thread.sleep(1000);
        startSearchAndPauseAfter(20);
        Thread.sleep(1000);
        totalResultsWithParameters = getTotalRecs();
        Thread.sleep(1000);
        assertFalse(totalResultsNoParameters == totalResultsWithParameters);
    }
    
    @Test
    public void CustomSearchNewspapersBooks() throws Exception {
        ArrayList<String> zones = new ArrayList();
        zones.add("newspaper");
        zones.add("book");
        
        LoginFunc();
        Thread.sleep(1000);
        customSearch(zones, "Celestials");
        Thread.sleep(1000);
        startSearchAndPauseAfter(20);        
        Thread.sleep(1000);
        assertTrue(selenium.isTextPresent("newspaper"));
        assertTrue(selenium.isTextPresent("book"));
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
    }
    
    @Test
    public void CustomSearchAllZones() throws Exception {
        ArrayList<String> zones = new ArrayList();
        zones.add("newspaper");
        zones.add("article");
        zones.add("book");
        zones.add("picture");
        zones.add("music");
        zones.add("collection");
        zones.add("list");
        zones.add("map");
        
        LoginFunc();
        Thread.sleep(1000);
        customSearch(zones, "Celestials");
        Thread.sleep(1000);
        startSearchAndPauseAfter(20);        
        Thread.sleep(1000);
        for (int j = 0; j < zones.size(); j++) {
            assertTrue(selenium.isTextPresent(zones.get(j)));
        }
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        Thread.sleep(1000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(1000);
    }
    
    private ArrayList<String> addYearsToList(ArrayList list, int firstYear, int endYear) {
        for (int i = firstYear; i <= endYear; i++) {
            list.add(String.valueOf(i));
        }
        return list;
    }
    
    // Perform a custom search with a single zone and a map of parameter(s) 
    // HashMap parameters: id: value
    private void customSearch(String zone, String searchTerm, HashMap<String, String> parameters) throws Exception { 
        String element = "";
        String value = "";
        String[] elements = new String[2];
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-3");
        Thread.sleep(1000);
        if (!selenium.isChecked("id=custom-zone-" + zone)) {
            selenium.click("id=custom-zone-" + zone);  
        }          
        Thread.sleep(1000);
        for (String key : parameters.keySet()) {
            element = key;
            value = parameters.get(key);
            elements = element.split(":");
            String elementType = elements[0].toString();
            String elementId = elements[1].toString();
            if (elementType.contains("select")) {
                selenium.select(elementId, value);
            } else if (elementType.contains("textbox")) {
                selenium.type(elementId, value);
            } else if (elementType.contains("radio") || elementType.contains("checkbox")) {
                selenium.click(elementId);
            }
            Thread.sleep(1000);
        }
        Thread.sleep(1000);
        selenium.type("id=cus-query", searchTerm);
    }
    
    private void customSearch(String zone, String searchTerm) throws Exception {
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-3");
        Thread.sleep(1000);
        if (!selenium.isChecked("id=custom-zone-" + zone)) {
            selenium.click("id=custom-zone-" + zone);  
        }               
        Thread.sleep(1000);
        selenium.type("id=cus-query", searchTerm);
    }
    
    private void customSearch(ArrayList zones, String searchTerm) throws Exception {
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-3");
        for (int i = 0; i < zones.size(); i++) {
            if (!selenium.isChecked("id=custom-zone-" + zones.get(i))) {
                selenium.click("id=custom-zone-" + zones.get(i));  
            }               
        }
        Thread.sleep(1000);
        selenium.type("id=cus-query", searchTerm);
    }
    
    private void simpleSearch(String searchTerm) throws Exception {
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.type("id=q1", searchTerm);
    }
    
    private void advancedSearchArticle(String searchTerm) throws Exception {
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.type("id=adv-query", searchTerm);
    }
    
    private void advancedSearchBook(String searchTerm) throws Exception {
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-book");
        Thread.sleep(1000);
        selenium.type("id=adv-query", searchTerm);
    }
    
    private void advancedSearchCollection(String searchTerm) throws Exception {
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-collection");
        Thread.sleep(1000);
        selenium.type("id=adv-query", searchTerm);
    }
    
    private void advancedSearchList(String searchTerm) throws Exception {
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-list");
        Thread.sleep(1000);
        selenium.type("id=adv-query", searchTerm);
    }
    
    private void advancedSearchMap(String searchTerm) throws Exception {
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-map");
        Thread.sleep(1000);
        selenium.type("id=adv-query", searchTerm);
    }
    
    private void advancedSearchMusic(String searchTerm) throws Exception {
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-music");
        Thread.sleep(1000);
        selenium.type("id=adv-query", searchTerm);
    }
    
    private void advancedSearchNewspaper(String searchTerm) throws Exception {
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-newspaper");
        Thread.sleep(1000);
        selenium.type("id=adv-query", searchTerm);
    }
    
    private void advancedSearchPicture(String searchTerm) throws Exception {
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-picture");
        Thread.sleep(1000);
        selenium.type("id=adv-query", searchTerm);
    }
    
    private void startSearchAndPause() throws Exception {
        selenium.click("id=nq-pb12");
        Thread.sleep(5000);
        selenium.click("id=btn-pause");
    }
    
    private void startSearchAndPause(int waitTime) throws Exception {
        selenium.click("id=nq-pb12");
        Thread.sleep(waitTime);
        selenium.click("id=btn-pause");
    }
    
    /**
     * Starts a search and pauses immediately after greater than or equal to 
     * the parameter "results" have been processed
     * @param results
     * @throws Exception
     */
    private void startSearchAndPauseAfter(int results) throws Exception {
        selenium.click("id=nq-pb12");
        int count = 0;
        String split[];
        String text = "";
        
        while (count < results) {
            text = selenium.getText("id=progress");
            split = text.split(" / ");
            count = Integer.parseInt(split[0]);
            Thread.sleep(50);
        }
        selenium.click("id=btn-pause");
    }
    
    private void startSearchAndPause(String element, String contains) throws Exception {
        selenium.click("id=nq-pb12");
        String text = selenium.getText(element);
        while (!text.contains(contains)) {
            text = selenium.getText(element);
            Thread.sleep(50);
        }
        selenium.click("id=btn-pause");
    }
    
    
    // Deletes saved query at specified index
    private void deleteSavedQuery(int number) throws Exception {
        String element = "id=dqcb" + number;
        if (selenium.isElementPresent("id=dqcb" + number)) {
            selenium.click(element);
            Thread.sleep(1000);
            selenium.click("id=dq-pb1");
        }
    }
    
    // Deletes all saved queries if "all" is passed
    private void deleteSavedQuery(String command) throws Exception {
        if (command == "all") {
            int number = 0;
            String element = "id=dqcb" + number;
            while (selenium.isElementPresent(element)) {
                selenium.click(element);
                number++;
                element = "id=dqcb" + number;
                Thread.sleep(300);
            }
            if(selenium.isElementPresent("id=dq-pb1")){
                Thread.sleep(1000);
                selenium.click("id=dq-pb1");
            }
        }
    }

    private int getTotalRecs() throws Exception {
        String split[];
        String text = "";
        String records = "";
        String rec = "";
        int totalRecords;
        
        if (!selenium.isVisible("id=progress")) {
            return 0;
        }
        
        text = selenium.getText("id=progress");
        split = text.split(" / ");
        records = split[1].split("%20")[0].split("r")[0];
        rec = records.substring(0, records.length() - 1);
        totalRecords = Integer.parseInt(rec);
        return totalRecords;
    }
    
       
    @After
    public void tearDown() throws Exception {
        selenium.stop();
    }
}
