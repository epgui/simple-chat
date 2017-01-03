import java.util.Date;
import static java.lang.Math.toIntExact;

public class Message {
   private int id;
   private String contents;
   private String author;
   private int timestamp;

   public Message() {
      setId();
      setTimestamp();
   }

   public int getId() {
      return id;
   }

   public void setId() {
      // Create a message ID number
      this.id = Chat.nextMessageNumber++;
   }

   public String getContents() {
      return contents;
   }

   public void setContents(String contents) {
      this.contents = contents;
   }

   public String getAuthor() {
      return author;
   }

   public void setAuthor(String author) {
      this.author = author;
   }

   public int getTimestamp() {
      return timestamp;
   }

   public void setTimestamp() {
      // Get a UNIX timestamp
      Date now = new Date();
      this.timestamp = toIntExact(now.getTime() / 1000);
   }

   @Override
   public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append("--------------------------\n");
      sb.append("Message ID#" + getId() + "\n");
      sb.append("On " + getTimestamp() + "\n");
      sb.append("--------------------------\n");
      sb.append(getAuthor() + " says:\n");
      sb.append(getContents() + "\n");
      sb.append("--------------------------\n");
      return sb.toString();
   }
}
