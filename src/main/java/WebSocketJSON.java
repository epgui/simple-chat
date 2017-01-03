import org.eclipse.jetty.websocket.api.Session;
import java.util.*;

/**
 * Created by Guillaume on 2017-01-02.
 */
public class WebSocketJSON {

   private User sender;
   private Message message;
   private List<User> userMap = new ArrayList<User>();

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

   public List<User> getUserList() {
      return userMap;
   }

   public void setUserList(List<User> userMap) {
      this.userMap = userMap;
   }

   public void addUserToList(User user) {
      this.userMap.add(user);
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
      sb.append(getUserList().toString());
      sb.append("--------------------------\n");
      return sb.toString();
   }

}
