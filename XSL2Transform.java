import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.FactoryConfigurationError;
import javax.xml.parsers.ParserConfigurationException;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.w3c.dom.Document;
import org.w3c.dom.DOMException;

// For write operation
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;

/*
import net.sf.saxon.s9api.DOMDestination;
import net.sf.saxon.s9api.Processor;
import net.sf.saxon.s9api.SaxonApiException;
import net.sf.saxon.s9api.XdmNode;
import net.sf.saxon.s9api.XsltCompiler;
import net.sf.saxon.s9api.XsltExecutable;
import net.sf.saxon.s9api.XsltTransformer;
*/

public class XSL2Transform {
	
	public static String transformXSL2(String xmlAsString, String xslAsString){
		Document documentA;
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		String returnString = "";
		
        try {
			
            DocumentBuilder builder = factory.newDocumentBuilder();
			InputStream stream = new ByteArrayInputStream(xmlAsString.getBytes("UTF-8"));
			documentA = builder.parse(stream);

            // Use a Transformer for output
            TransformerFactory tFactory = TransformerFactory.newInstance();
            StreamSource stylesource = new StreamSource(new StringReader(xslAsString));
            Transformer transformerA = tFactory.newTransformer(stylesource);

            DOMSource source = new DOMSource(documentA);
			StringWriter writer = new StringWriter();
			StreamResult resultA = new StreamResult(writer);
            transformerA.transform(source, resultA);
			returnString = writer.toString();
			return returnString;
			
        } catch (TransformerConfigurationException tce) {
			returnString = "TransformerConfiguration error:\n" + tce.getMessage();
        } catch (TransformerException te) {
			returnString = "TransformerConfiguration error:\n" + te.getMessage();
        } catch (SAXException sxe) {
			returnString = "SAX error:\n" + sxe.getMessage();
        } catch (ParserConfigurationException pce) {
			returnString = "ParserConfiguration error:\n" + pce.getMessage();
        } catch (IOException ioe) {
			returnString = "IO error:\n" + ioe.getMessage();
        }

		return returnString;

	}
}