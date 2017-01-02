import org.eclipse.jetty.websocket.api.Session;
import java.util.Map;

/**
 * Created by Guillaume on 2017-01-02.
 */
public class WebSocketJSON {

   private User sender;
   private Message message;
   private Map<Session, User> sessionUserMap;

   public User getSender() {
      return sender;
   }

   public void setSender(User sender) {
      this.sender = sender;
   }

   public Message getMessage() {
      return message;
   }

   public void setMessage(Message message) {
      this.message = message;
   }

   public Map<Session, User> getSessionUserMap() {
      return sessionUserMap;
   }

   public void setSessionUserMap(Map<Session, User> sessionUserMap) {
      this.sessionUserMap = sessionUserMap;
   }

   @Override
   public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append("--------------------------\n");
      sb.append("Sender:\n");
      sb.append(getSender().toString());
      sb.append("Message:\n");
      sb.append(getMessage().toString());
      sb.append("--------------------------\n");
      sb.append("sessionUserMap:");
      sb.append(getSessionUserMap().toString());
      sb.append("--------------------------\n");
      return sb.toString();
   }

}
