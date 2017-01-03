import java.io.IOException;
import java.io.StringWriter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import org.eclipse.jetty.websocket.api.*;
import static spark.Spark.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import javax.annotation.Nullable;

public class Chat {

   // this map is shared between sessions and threads, so it needs to be thread-safe
   // (http://stackoverflow.com/a/2688817)

   static User server = new ServerUser();
   static Map<Session, User> sessionUserMap = new ConcurrentHashMap<>();
   static int nextUserNumber = 1; //Used for creating the next username

   public static void main(String[] args) {

      // staticFileLocation("/public"); //index.html is served at localhost:4567 (default port)
      webSocket("/chat", ChatWebSocketHandler.class);
      init();

   }

   //Sends a message from one user to all users, along with a list of current usernames
   public static void broadcastMessage(User sender, String jsonMessage) {

      System.out.println("Preparing to broadcast the following json message:\n");
      System.out.println(jsonMessage + "\n");

      // Interpret received message
      Message message = createMessageFromJSON(jsonMessage);

      // Build communication
      WebSocketJSON communication = new WebSocketJSON();
      communication.setSender(sender);
      communication.setMessage(message);
      communication.setSessionUserMap(sessionUserMap);

      System.out.println("Preparing to broadcast the following communication:\n");
      System.out.println(convertObjectToJSON(communication) + "\n");

      sessionUserMap.keySet().stream().filter(Session::isOpen).forEach(session -> {

         System.out.println("This is the list of recipients:\n");
         System.out.println(session.toString() + "\n");

         try {

            session.getRemote().sendString(convertObjectToJSON(communication));

         } catch (Exception e) {

            e.printStackTrace();

         }

      });

   }

   @Nullable
   public static Message createMessageFromJSON(String receivedJSON) {

      try {

         ObjectMapper objectMapper = new ObjectMapper();
         return objectMapper.readValue(receivedJSON, Message.class);

      } catch(IOException e) {

         // TODO: Figure out something meaningful to do with this exception.
         e.printStackTrace();
         return null;

      }

   }

   @Nullable
   private static User createUserFromJSON(String receivedJSON) {

      try {

         ObjectMapper objectMapper = new ObjectMapper();
         return objectMapper.readValue(receivedJSON, User.class);

      } catch(IOException e) {

         // TODO: Figure out something meaningful to do with this exception.
         e.printStackTrace();
         return null;

      }

   }

   @Nullable
   public static String convertObjectToJSON(Object object) {

      ObjectMapper objectMapper = new ObjectMapper();
      objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true); // Pretty print

      try {

         StringWriter messageJSON = new StringWriter();
         objectMapper.writeValue(messageJSON, object);
         return messageJSON.toString();

      } catch(IOException e) {

         // TODO: Figure out something meaningful to do with this exception.
         e.printStackTrace();
         return null;

      }

   }

}