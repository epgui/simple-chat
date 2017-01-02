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

      // Get a UNIX timestamp
      Date now = new Date();
      int timestamp = toIntExact(now.getTime() / 1000);

      // Create user object
      User user = new User();
      user.setId(id);
      user.setUsername(temporaryUsername);
      user.setLastActive(timestamp);

      // Add user to the conversation
      Chat.sessionUserMap.put(userSession, user);

      // Broadcast
      User sender = Chat.server;
      String msg = user.getUsername() + " joined the chat";
      Chat.broadcastMessage(sender, msg);

   }

   @OnWebSocketClose
   public void onClose(Session userSession, int statusCode, String reason) {

      User user = Chat.sessionUserMap.get(userSession);
      Chat.sessionUserMap.remove(userSession);

      User sender = Chat.server;
      String msg = user.getUsername() + " left the chat";
      Chat.broadcastMessage(sender, msg);

   }

   @OnWebSocketMessage
   public void onMessage(Session user, String jsonMessage) {

      // TODO: Add support for custom usernames

      User sender = Chat.sessionUserMap.get(user);
      Chat.broadcastMessage(sender, jsonMessage);

   }

}
