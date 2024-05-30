package open.mind.its.recrutement.application.offermanagment.SERVICES;


import com.lowagie.text.*;
import com.lowagie.text.pdf.CMYKColor;
import com.lowagie.text.pdf.PdfWriter;
import open.mind.its.recrutement.application.offermanagment.DTOS.OfferDto;
import org.springframework.stereotype.Service;


import java.io.FileNotFoundException;
import java.io.FileOutputStream;


@Service
public class PdfGeneratorService {
     public void generatePdfFile(OfferDto offerDto,String path) throws FileNotFoundException, DocumentException {
         Document document = new Document();
         PdfWriter.getInstance(document, new FileOutputStream(path+offerDto.getId()+".pdf"));
         document.open();
         // Creating font
         // Setting font style and size
         Font fontTiltle = FontFactory.getFont(FontFactory.TIMES_ROMAN);
         fontTiltle.setSize(20);
         Font font = FontFactory.getFont(FontFactory.TIMES_ROMAN);
         font.setColor(CMYKColor.PINK);
         font.setSize(15);
         Font fontText = FontFactory.getFont(FontFactory.TIMES_ROMAN);
         fontText.setColor(CMYKColor.BLACK);
         fontText.setSize(10);
         // Aligning the paragraph in document
         Paragraph p = new Paragraph("Offer Information",fontTiltle);
         p.setAlignment(Paragraph.ALIGN_CENTER);
         Paragraph p0 = new Paragraph("                                  ");
         p0.setAlignment(Paragraph.ALIGN_LEFT);
         Paragraph p1 = new Paragraph(" Offer Title :   ",font);
         p1.setAlignment(Paragraph.ALIGN_LEFT);
         Paragraph p11 = new Paragraph("    "+offerDto.getOffer_title()+"   ",fontText);
         p11.setAlignment(Paragraph.ALIGN_CENTER);
         Paragraph p2 = new Paragraph(" Desired Profile :   ",font);
         p2.setAlignment(Paragraph.ALIGN_LEFT);
         Paragraph p22 = new Paragraph("    "+offerDto.getDesired_profile()+"   ",fontText);
         p22.setAlignment(Paragraph.ALIGN_CENTER);
         Paragraph p3 = new Paragraph("Benefits  :   ",font);
         p3.setAlignment(Paragraph.ALIGN_LEFT);
         Paragraph p33 = new Paragraph("    "+offerDto.getBenefits()+"   ",fontText);
         p33.setAlignment(Paragraph.ALIGN_CENTER);
         Paragraph p4 = new Paragraph(" Offer Localisation  :   ",font);
         p4.setAlignment(Paragraph.ALIGN_LEFT);
         Paragraph p44= new Paragraph("    "+offerDto.getLocalisation()+"   ",fontText);
         p44.setAlignment(Paragraph.ALIGN_CENTER);
         Paragraph p5 = new Paragraph(" Offer Desc  :   ",font);
         p5.setAlignment(Paragraph.ALIGN_LEFT);
         Paragraph p55= new Paragraph("    "+offerDto.getOffer_description()+"   ",fontText);
         p55.setAlignment(Paragraph.ALIGN_CENTER);
         Paragraph p6 = new Paragraph(" Keys  :   ",font);
         p6.setAlignment(Paragraph.ALIGN_LEFT);
         Paragraph p66= new Paragraph("    "+offerDto.getKey_points()+"   ",fontText);
         p66.setAlignment(Paragraph.ALIGN_CENTER);


         // Add offer information

         document.add(p0);
         document.add(p);
         document.add(p0);
         document.add(p0);
         document.add(p1);
         document.add(p0);
         document.add(p11);
         document.add(p0);
         document.add(p2);
         document.add(p0);
         document.add(p22);
         document.add(p0);
         document.add(p3);
         document.add(p0);
         document.add(p33);
         document.add(p0);
         document.add(p4);
         document.add(p0);
         document.add(p44);
         document.add(p0);
         document.add(p5);
         document.add(p0);
         document.add(p55);
         document.add(p0);
         document.add(p6);
         document.add(p0);
         document.add(p66);



         document.close();
     }



}
