import java.util.*;
import static java.lang.Math.toIntExact;
import org.eclipse.jetty.websocket.api.*;
import org.eclipse.jetty.websocket.api.annotations.*;

@WebSocket
public class ChatWebSocketHandler {

   @OnWebSocketConnect
   public void onConnect(Session userSession) throws Exception {

      // Create a user ID number
      int userID = Chat.nextUserNumber++;

      // TODO: Add support for custom usernames
      // Create a temporary username
      String temporaryUsername = "User " + userID;

      // Create user object
      User user = new User();
      user.setId(userID);
      user.setUsername(temporaryUsername);

      // Add user to the conversation
      Chat.sessionUserMap.put(userSession, user);
      Chat.idUserMap.put(userID, user);

      // Build a server message
      // Message message = new Message();
      // message.setAuthor(Chat.server.getUsername());
      // message.setContents(user.getUsername() + " joined the chat.");
      // String jsonMessage = Chat.convertObjectToJSON(message);

      // System.out.println("onConnect built the following json message:\n");
      // System.out.println(jsonMessage + "\n");

      // Chat.broadcastMessage(Chat.server, jsonMessage);

   }

   @OnWebSocketClose
   public void onClose(Session userSession, int statusCode, String reason) {

      User user = Chat.sessionUserMap.get(userSession);
      Chat.sessionUserMap.remove(userSession);

      // Build a server message
      Message message = new Message();
      message.setAuthor(Chat.server.getUsername());
      message.setContents(user.getUsername() + " left the chat.");
      String jsonMessage = Chat.convertObjectToJSON(message);

      System.out.println("onClose built the following json message:\n");
      System.out.println(jsonMessage);

      Chat.broadcastMessage(Chat.server, jsonMessage);

   }

   @OnWebSocketMessage
   public void onMessage(Session user, String jsonMessage) {

      // Just doing this so I can get prettified JSON in my console. Might eventually want to validate jsonMessage here.
      Message message = Chat.createMessageFromJSON(jsonMessage);
      String prettyJSON = Chat.convertObjectToJSON(message);
      System.out.println("onMessage received the following json message:\n");
      System.out.println(prettyJSON + "\n");

      User sender = Chat.sessionUserMap.get(user);

      if ( ! Objects.equals(sender.getUsername(), message.getAuthor()) ) {

         // Build a server message to notify everyone of the username change
         Message deltaMessage = new Message();
         deltaMessage.setAuthor(Chat.server.getUsername());

         if ( Objects.equals(message.getContents(), "login-handshake") ) {
            deltaMessage.setContents(message.getAuthor() + " joined the chat.");
         }
         else {
            deltaMessage.setContents(sender.getUsername() + " is now called " + message.getAuthor() + ".");
         }

         sender.setUsername(message.getAuthor());

         String jsonDeltaMessage = Chat.convertObjectToJSON(deltaMessage);
         Chat.broadcastMessage(Chat.server, jsonDeltaMessage);

      }
      else {
         Chat.broadcastMessage(sender, jsonMessage);
      }

   }

}
