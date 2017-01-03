import java.util.Date;

import static java.lang.Math.toIntExact;

/**
 * Created by Guillaume on 2016-12-31.
 */
public class User {

   private int id;
   private String username;
   private int lastActive;

   public User(int id, String username) {
      this.id = id;
      this.username = username;
      setLastActive();
   }

   public User() {
      setLastActive();
   }

   public int getId() {
      return id;
   }

   public void setId(int id) {
      this.id = id;
   }

   public String getUsername() {
      return username;
   }

   public void setUsername(String username) {
      this.username = username;
   }

   public int getLastActive() {
      return lastActive;
   }

   public void setLastActive() {
      // Get a UNIX timestamp
      Date now = new Date();
      this.lastActive = toIntExact(now.getTime() / 1000);
   }

   @Override
   public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append("--------------------------\n");
      sb.append("User object\n");
      sb.append("--------------------------\n");
      sb.append("ID: " + getId() + "\n");
      sb.append("username: " + getUsername() + "\n");
      sb.append("lastActive: " + getLastActive() + "\n");
      sb.append("--------------------------\n");
      return sb.toString();
   }
}