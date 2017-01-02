/**
 * Created by Guillaume on 2016-12-31.
 */
public class Message {
    private int id;
    private String contents;
    private String author;
    private int timestamp;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public void setTimestamp(int timestamp) {
        this.timestamp = timestamp;
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
