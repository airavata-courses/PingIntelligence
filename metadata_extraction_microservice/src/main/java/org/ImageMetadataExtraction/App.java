package org.ImageMetadataExtraction;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import java.io.File;
import java.io.IOException;

public class App 
{
    public static void main(String[] args) {
        File file = new File("C:\\Users\\sudip\\Pictures\\luddy.jpg");

        try {
            Metadata metadata = ImageMetadataReader.readMetadata(file);
            print(metadata);
        } catch (ImageProcessingException | IOException e) {
            print(e);
        }
    }

    private static void print(Metadata metadata)
    {
        System.out.println();
        System.out.println("-------------------------------------------------");
        System.out.print(' ');
        System.out.print("Using ImageMetadataReader");
        System.out.println("-------------------------------------------------");
        System.out.println();

        //
        // A Metadata object contains multiple Directory objects
        //
        for (Directory directory : metadata.getDirectories()) {

            //
            // Each Directory stores values in Tag objects
            //
            for (Tag tag : directory.getTags()) {
                System.out.println(tag.toString());
            }

            //
            // Each Directory may also contain error messages
            //
            for (String error : directory.getErrors()) {
                System.err.println("ERROR: " + error);
            }
        }
    }

    private static void print(Exception exception)
    {
        System.err.println("EXCEPTION: " + exception);
    }
}
