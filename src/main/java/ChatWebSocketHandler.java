import java.util.*;
import static java.lang.Math.toIntExact;
import org.eclipse.jetty.websocket.api.*;
import org.eclipse.jetty.websocket.api.annotations.*;

@WebSocket
public class ChatWebSocketHandler {

   @OnWebSocketConnect
   public void onConnect(Session userSession) throws Exception {

      // Create a user ID number
      int id = Chat.nextUserNumber++;

      // TODO: Add support for custom usernames
      // Create a temporary username
      String temporaryUsername = "User " + id;

      // Create user object
      User user = new User();
      user.setId(id);
      user.setUsername(temporaryUsername);

      // Add user to the conversation
      Chat.sessionUserMap.put(userSession, user);

      // Build a server message
      Message message = new Message();
      message.setId(1);
      message.setAuthor(Chat.server.getUsername());
      message.setContents(user.getUsername() + " joined the chat");
      String jsonMessage = Chat.convertObjectToJSON(message);

      System.out.println("onConnect built the following json message:\n");
      System.out.println(jsonMessage + "\n");

      Chat.broadcastMessage(Chat.server, jsonMessage);

   }

   @OnWebSocketClose
   public void onClose(Session userSession, int statusCode, String reason) {

      User user = Chat.sessionUserMap.get(userSession);
      Chat.sessionUserMap.remove(userSession);

      // Build a server message
      Message message = new Message();
      message.setId(1);
      message.setAuthor(Chat.server.getUsername());
      message.setContents(user.getUsername() + " left the chat");
      String jsonMessage = Chat.convertObjectToJSON(message);

      System.out.println("onClose built the following json message:\n");
      System.out.println(jsonMessage);

      Chat.broadcastMessage(Chat.server, jsonMessage);

   }

   @OnWebSocketMessage
   public void onMessage(Session user, String jsonMessage) {

      // TODO: Add support for custom usernames

      // Just doing this so I can get prettified JSON in my console. Might eventually want to validate jsonMessage here.
      Message message = Chat.createMessageFromJSON(jsonMessage);
      String prettyJSON = Chat.convertObjectToJSON(message);

      System.out.println("onMessage received the following json message:\n");
      System.out.println(prettyJSON + "\n");

      User sender = Chat.sessionUserMap.get(user);
      Chat.broadcastMessage(sender, jsonMessage);

   }

}
