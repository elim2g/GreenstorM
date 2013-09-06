package tests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class SeleniumTest {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", "http://localhost:8080/");
		selenium.start();
	}

	@Test
	public void Login() throws Exception {
		selenium.open("/PaperMiner");
		selenium.click("link=User");
		Thread.sleep(300);
		selenium.click("link=Login or Register");
		Thread.sleep(300);
		selenium.type("em", "mr.tincknell@gmail.com");
		selenium.click("xpath=(//button[@type='button'])[5]");
		Thread.sleep(300);
		selenium.click("link=Query");
		Thread.sleep(3000);
		selenium.click("link=New");
	}
	
	@Test
	public void MenusOpen() throws Exception {
		selenium.open("/PaperMiner");
		selenium.click("link=User");
		Thread.sleep(300);
		selenium.click("link=Login or Register");
		Thread.sleep(300);
		selenium.type("em", "mr.tincknell@gmail.com");
		selenium.click("xpath=(//button[@type='button'])[5]");
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
		selenium.open("/PaperMiner/");
		selenium.click("link=User");
		Thread.sleep(300);
		selenium.click("link=Login or Register");
		Thread.sleep(300);
		selenium.type("id=em", "mr.tincknell@gmail.com");
		selenium.click("xpath=(//button[@type='button'])[5]");
		Thread.sleep(300);
		selenium.click("link=Home");
		Thread.sleep(300);
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
		assertTrue(selenium.isTextPresent("13."));
		selenium.click("css=#raw-view > h3");
		selenium.click("link=Query");
		selenium.click("link=New");
		selenium.click("xpath=(//input[@name='query-rb1'])[2]");
		selenium.click("id=aq1");
		Thread.sleep(1000);
		selenium.type("aq1", "celestials");
		selenium.select("z1", "label=book");
		selenium.click("xpath=(//button[@id='nq-pb12'])[2]");
		Thread.sleep(7000);
		selenium.click("id=cc-pb11");
		selenium.click("link=View");
		selenium.click("link=Raw Results");
		selenium.click("xpath=(//input[@name='raw-sort-rb'])[2]");
		Thread.sleep(3000);
		assertTrue(selenium.isTextPresent("9.33"));
	}
	

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}