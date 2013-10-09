package tests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class SeleniumTest {
    private Selenium selenium;
    
    @Before
    public void setUp() throws Exception {
        selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://localhost:8080/PaperMiner/");
        selenium.start();
    }
    
    public void LoginFunc() throws Exception {
        selenium.open("/PaperMiner");
        Thread.sleep(2000);
        selenium.click("link=User");
        Thread.sleep(300);
        selenium.click("link=Login or Register");
        Thread.sleep(300);
        selenium.type("em", "dev@paperminer.com");
        selenium.click("xpath=(//button[@type='button'])[6]");
    }
    
    @Test
    public void Login() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        selenium.click("link=Query");
        Thread.sleep(3000);
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
        selenium.click("link=Histogram");
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
    public void AdvancedSearch() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=Home");
        
        Thread.sleep(2000);
        selenium.click("link=Query");
        Thread.sleep(700);
        selenium.click("link=New");
        selenium.click("id=aq1");
        Thread.sleep(1000);
        selenium.type("q1", "celestials");
        Thread.sleep(1000);
        selenium.click("id=nq-pb12");
        Thread.sleep(6000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("link=View");
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[2]");
        Thread.sleep(6000);
        assertTrue(selenium.isTextPresent("13."));
        selenium.click("link=New");
        selenium.click("id=ui-id-2");
        selenium.click("id=aq1");
        Thread.sleep(1000);
        selenium.type("aq1", "celestials");
        selenium.click("z1b");
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(10000);
        selenium.click("id=btn-pause");
        selenium.click("link=View");
        selenium.click("link=Raw Results");
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[2]");
        Thread.sleep(3000);
        assertTrue(selenium.isTextPresent("9.3"));
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
        selenium.click("link=Histogram");
        
    }
    @Test
    public void AdvancedDate() throws Exception {
        LoginFunc();
        Thread.sleep(600);
        selenium.click("link=New");
        selenium.click("xpath=(//input[@name='query-rb1'])[2]");
        Thread.sleep(600);
        selenium.type("id=aq1", "celestials");
        selenium.click("id=z1a");
        selenium.select("id=aqYearStart", "label=1900");
        selenium.select("id=aqYearEnd", "label=1920");
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(5000);
        selenium.click("id=cc-pb11");
        selenium.click("link=Raw Results");
        Thread.sleep(2000);
        assertTrue(selenium.isTextPresent("1900"));
        assertTrue(selenium.isTextPresent("1920"));
        assertFalse(selenium.isTextPresent("1898"));
        assertFalse(selenium.isTextPresent("2027"));
        }
    
    @Test
    public void SaveQuery() throws Exception {
        LoginFunc();
        Thread.sleep(500);
        selenium.click("link=New");
        Thread.sleep(500);
        selenium.type("id=q1", "celestials");
        selenium.click("id=nq-pb12");
        Thread.sleep(2000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("id=cc-pb13");
        Thread.sleep(1000);
        assertTrue((selenium.getText("id=q1")) == "celestials");
        
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
        selenium.click("id=aq1");
        Thread.sleep(1000);
        selenium.type("q1", "celestials");
        Thread.sleep(500);
        selenium.click("id=nq-pb12");
        Thread.sleep(13000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("link=View");
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[2]");
        Thread.sleep(4000);
        
        selenium.click("name=raw-sort-rb");
        Thread.sleep(4000);
        assertTrue(selenium.isTextPresent("1853-03-15"));
        assertFalse(selenium.isTextPresent("1907-03-19"));
    }
    
    @Test
    public void SortByRelevance() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=Home");
        
        Thread.sleep(2000);
        selenium.click("link=Query");
        Thread.sleep(700);
        selenium.click("link=New");
        selenium.click("id=aq1");
        Thread.sleep(1000);
        selenium.type("q1", "celestials");
        Thread.sleep(1000);
        selenium.click("id=nq-pb12");
        Thread.sleep(10000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("link=View");
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[2]");
        Thread.sleep(4000);
        
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[2]");
        Thread.sleep(3000);
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
        selenium.click("id=aq1");
        Thread.sleep(1000);
        selenium.type("q1", "celestials");
        Thread.sleep(1000);
        selenium.click("id=nq-pb12");
        Thread.sleep(10000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("link=View");
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[2]");
        Thread.sleep(4000);
        
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[3]");
        Thread.sleep(4000);
        assertTrue(selenium.isTextPresent("000008"));
        assertFalse(selenium.isTextPresent("000275"));
    }
    
    @Test
    public void SortByRetrieveOrder() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=Home");
        
        Thread.sleep(2000);
        selenium.click("link=Query");
        Thread.sleep(700);
        selenium.click("link=New");
        selenium.click("id=aq1");
        Thread.sleep(1000);
        selenium.type("q1", "celestials");
        Thread.sleep(1000);
        selenium.click("id=nq-pb12");
        Thread.sleep(10000);
        selenium.click("id=cc-pb11");
        Thread.sleep(1000);
        selenium.click("link=View");
        Thread.sleep(1000);
        selenium.click("link=Raw Results");
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[2]");
        Thread.sleep(4000);
        
        selenium.click("xpath=(//input[@name='raw-sort-rb'])[4]");
        Thread.sleep(4000);
        assertTrue(selenium.isTextPresent("1897-04-15"));
        assertFalse(selenium.isTextPresent("1904-06-11"));
    }
    
    @Test
    public void AdvancedSearchNewspapers() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=New");
        Thread.sleep(700);
        selenium.click("link=New");
        Thread.sleep(700);
        selenium.click("id=ui-id-2");
        selenium.click("id=adv-newspaper");
        selenium.type("id=aq1", "Celestials");
        
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        selenium.click("id=ui-id-2");
        Thread.sleep(4000);
        selenium.click("id=btn-pause");
        selenium.click("link=View");
        Thread.sleep(700);
        selenium.click("link=Raw Results");
        Thread.sleep(500);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(3000);
        assertTrue(selenium.isTextPresent("1897-04-15"));
    }
    
    @Test
    public void AdvancedSearchBooks() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=New");
        Thread.sleep(700);
        selenium.click("link=New");
        Thread.sleep(700);
        selenium.click("id=ui-id-2");
        selenium.click("id=adv-book");
        selenium.type("id=aq1", "Celestials");
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");       
        Thread.sleep(7000);
        selenium.click("id=btn-pause");
        assertEquals("&zone=book&q=", selenium.getAlert());
        selenium.click("link=View");
        Thread.sleep(700);
        selenium.click("link=Raw Results");
        Thread.sleep(3000);
        selenium.click("name=raw-sort-rb");
        Thread.sleep(3000);
        assertTrue(selenium.isTextPresent("2004-2009"));
    }
    
    @Test
    public void AdvancedSearchPictures() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=New");
        Thread.sleep(700);
        selenium.click("link=New");
        Thread.sleep(700);
        selenium.click("id=ui-id-2");
        selenium.click("id=adv-picture");
        selenium.type("id=aq1", "Celestials");
        
        Thread.sleep(4000);
        selenium.click("id=btn-pause");
        selenium.click("link=View");
        Thread.sleep(700);
        selenium.click("link=Raw Results");
        assertTrue(selenium.isTextPresent("1855"));
    }
    
    @Test
    public void AdvancedSearchArticle() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=New");
        Thread.sleep(700);
        selenium.click("id=ui-id-2");
        selenium.click("xpath=(//input[@type='checkbox'])[23]");
        selenium.type("id=aq1", "Celestials");
        selenium.click("id=ui-id-2");
        Thread.sleep(4000);
        selenium.click("id=btn-pause");
        selenium.click("link=View");
        Thread.sleep(700);
        selenium.click("link=Raw Results");
        assertTrue(selenium.isTextPresent("2010"));
    }
    
    @Test
    public void AdvancedSearchMusic() throws Exception {
        LoginFunc();
        Thread.sleep(600);
        
        selenium.click("link=New");
        Thread.sleep(700);
        selenium.click("id=ui-id-2");
        Thread.sleep(700);
        selenium.click("id=adv-music");
        Thread.sleep(700);
        selenium.type("id=aq1", "Celestials");
        selenium.click("xpath=(//button[@id='nq-pb12'])[3]");
        Thread.sleep(4000);
        selenium.click("id=btn-pause");
        selenium.click("link=View");
        Thread.sleep(700);
        selenium.click("link=Raw Results");
        assertTrue(selenium.isTextPresent("19"));
    }
    
    @Test
    public void AdvancedSearchMaps() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=New");
        Thread.sleep(700);
        selenium.click("id=ui-id-2");
        Thread.sleep(700);
        selenium.click("id=adv-map");
        Thread.sleep(700);
        selenium.type("id=aq1", "Celestials");
        selenium.click("xpath=(//button[@id='nq-pb12'])[3]");
        Thread.sleep(4000);
        selenium.click("id=btn-pause");
        selenium.click("link=View");
        Thread.sleep(700);
        selenium.click("link=Raw Results");
        assertTrue(selenium.isTextPresent("19"));
    }
    
    @Test
    public void CustomSearchLists() throws Exception {
        LoginFunc();
        Thread.sleep(300);
        
        selenium.click("link=New");
        Thread.sleep(700);
        selenium.click("xpath=(//input[@name='query-rb1'])[3]");
        selenium.click("xpath=(//input[@type='checkbox'])[65]");
        selenium.type("xpath=(//input[@id='q1'])[2]", "Celestials");
        selenium.click("xpath=(//button[@id='nq-pb12'])[3]");
        Thread.sleep(4000);
        selenium.click("id=btn-pause");
        selenium.click("link=View");
        Thread.sleep(700);
        selenium.click("link=Raw Results");
        assertTrue(selenium.isTextPresent("19"));
    }
   
    @Test
    public void MultipleZones() throws Exception {
        LoginFunc();
        Thread.sleep(600);
        
        selenium.click("link=Home");
        selenium.click("link=New");
        Thread.sleep(600);
        selenium.click("xpath=(//input[@name='query-rb1'])[2]");
        Thread.sleep(3000);
        selenium.type("id=aq1", "Celestials");
        selenium.click("id=z1a");
        selenium.click("id=z1b");
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(5000);
        selenium.click("id=cc-pb11");
        selenium.click("link=Raw Results");
        Thread.sleep(3000);
        assertTrue(selenium.isTextPresent("1897-04-15"));
        assertTrue(selenium.isTextPresent("2004-2009"));      
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
        Thread.sleep(800);
        assertTrue(selenium.isTextPresent("1992-03-06"));
        assertTrue(selenium.isTextPresent("1977-05-04"));
    }
    
    @Test
    public void testExportPic() throws Exception {
        LoginFunc();
        Thread.sleep(1000);
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-picture");
        Thread.sleep(1000);
        selenium.type("id=aq1", "Floods");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
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
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-newspaper");
        Thread.sleep(1000);
        selenium.type("id=aq1", "Floods");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
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
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-article");
        Thread.sleep(1000);
        selenium.type("id=aq1", "Floods");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
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
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-book");
        Thread.sleep(1000);
        selenium.type("id=aq1", "Floods");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
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
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-collection");
        Thread.sleep(1000);
        selenium.type("id=aq1", "Floods");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
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
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-list");
        Thread.sleep(1000);
        selenium.type("id=aq1", "Floods");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
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
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-map");
        Thread.sleep(1000);
        selenium.type("id=aq1", "Floods");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
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
        
        selenium.click("link=New");
        Thread.sleep(1000);
        selenium.click("id=ui-id-2");
        Thread.sleep(1000);
        selenium.click("id=adv-music");
        Thread.sleep(1000);
        selenium.type("id=aq1", "Floods");
        Thread.sleep(1000);
        selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
        Thread.sleep(2000);
        selenium.click("id=btn-pause");
        Thread.sleep(1000);
        selenium.click("id=cc-pb14");
        Thread.sleep(1000);
        selenium.click("id=export-csv");
        Thread.sleep(1000);
        selenium.click("css=body > a");
    }
        
    
    @After
    public void tearDown() throws Exception {
        selenium.stop();
    }
}